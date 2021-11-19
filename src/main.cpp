#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <gyro.h>

const char* ssid = "ELEC344";
const char* password = "password";

WebServer server(80);

void handle_getPage();
void handle_getRaw();

void setup(){
    Serial.begin(9600);
    Serial.println("Hello World");

    WiFi.softAP(ssid, password);
    Serial.print("Created newtork, IP: ");
    Serial.println(WiFi.localIP());

    server.on("/", handle_getPage);
    server.on("/raw", handle_getRaw);

    server.begin();
}

void loop(){
    server.handleClient();
}

void handle_getRaw(){
}

void handle_getPage(){

}