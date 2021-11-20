#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <gyro.h>

const char* ssid = "ELEC344";
const char* password = "password";

WebServer server(80);

void handle_getRaw();

void setup(){
    Serial.begin(9600);
    Serial.println("Hello World");

    if(!SPIFFS.begin())
        ESP_LOGE(TAG, "SPIFFS begin failed!");

    WiFi.softAP(ssid, password);
    Serial.print("Created newtork, IP: ");
    Serial.println(WiFi.localIP());

    server.serveStatic("/", SPIFFS, "/index.html");
    server.serveStatic("/main.js", SPIFFS, "/main.js");
    server.serveStatic("/three.min.js", SPIFFS, "/three.min.js");
    server.on("/raw", handle_getRaw);

    server.begin();

    Gyro::init();
}

void loop(){
    server.handleClient();
    Gyro::periodic();
}

void handle_getRaw(){
    float* ypr = Gyro::getYPR();
    String json;
    json += "{";
    json += "\"yaw\":";
    json += -ypr[0];
    json += ",\"roll\":";
    json +=  ypr[1];
    json += ",\"pitch\":";
    json += ypr[2];
    json += "}";
    server.send(200, "application/json", json);
}