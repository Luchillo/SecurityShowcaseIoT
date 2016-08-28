var request = require('request');
var sensorLib = require('node-dht-sensor');

// Read from sensor & send to Dweet.io
class SensorClass {
  constructor(sensor, request) {
    this.key = 'CX79NXA1V6VZMC06';
    this.sensor = sensor;
    this.request = request;

    if (sensor.initialize(11, 4)) {
      setInterval(() => this.read(), 1000);
    } else {
      console.error('Error initializing sensor');
    }
  }

  read() {
    // Read from sensor
    var readout = this.sensor.read();
    var temperature = readout.temperature.toFixed(2);
    var humidity = readout.humidity.toFixed(2);
    console.log('Temperature: ' + temperature + 'C, ' +
      'humidity: ' + humidity + '%');
    if (temperature > 29) {
      console.log();
    }

    request({
      uri: 'https://api.thingspeak.com/channels/149656',
      method: 'PUT',
      json: {
        name: 'Antitheft Showcase',
        api_key: this.key
      }
    }, (err, res, body) => {
      console.log(err, body);
    });
  }
}

let sensor = new SensorClass(sensorLib, request);

sensor.read();
