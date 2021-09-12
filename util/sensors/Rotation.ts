import { Accelerometer, Magnetometer } from 'expo-sensors'
import { Subscription } from '@unimodules/core'
const { pow, sqrt, acos, atan2, PI } = Math
export default class Rotation {
  private xAcceleration: number | null = null
  private yAcceleration: number | null = null
  private zAcceleration: number | null = null
  private xMagnetic: number | null = null
  private yMagnetic: number | null = null
  private zMagnetic: number | null = null
  private accelerationSubscriber: Subscription | null = null
  private magneticSubscriber: Subscription | null = null
  listen() {
    this.removerListener()
    this.accelerationSubscriber = Accelerometer.addListener(listener => {
      this.xAcceleration = listener.x
      this.yAcceleration = listener.y
      this.zAcceleration = listener.z
    })
    this.magneticSubscriber = Magnetometer.addListener(listener => {
      this.xMagnetic = listener.x
      this.yMagnetic = listener.y
      this.zMagnetic = listener.z
    })
  }
  removerListener() {
    !!this.accelerationSubscriber && this.accelerationSubscriber.remove()
    !!this.magneticSubscriber && this.magneticSubscriber.remove()
  }
  private isAccelerometerReady() {
    return (
      this.xAcceleration !== null &&
      this.yAcceleration !== null &&
      this.zAcceleration !== null
    )
  }
  private isMagnetometerReady() {
    return (
      this.xMagnetic !== null &&
      this.yMagnetic !== null &&
      this.zMagnetic !== null
    )
  }
  get sum() {
    if (!this.isAccelerometerReady()) return null
    return sqrt(
      pow(this.xAcceleration!, 2) +
        pow(this.yAcceleration!, 2) +
        pow(this.zAcceleration!, 2)
    )
  }
  get vertical() {
    if (!this.isAccelerometerReady()) return null
    return acos(this.zAcceleration! / this.sum!) // TODO: correct for other rotations
  }
  get horizontal() {
    if (!this.isMagnetometerReady()) return null
    return null
  }
}
