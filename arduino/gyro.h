#ifndef GYRO_H
#define GYRO_h

namespace Gyro {
  /**
   * Initialise the gyroscope
  */
  void init();
  /**
   * Call periodically to update the gyro values
  */
  void periodic();

  float getPitch();
  float getYaw();
  float getRoll();

  float *getYPR();
}

#endif
