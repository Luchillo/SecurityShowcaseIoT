const ThingSpeakClient = require('thingspeakclient');
const client = new ThingSpeakClient();
const sensorLib = require('node-dht-sensor');

// Read from sensor & send to Dweet.io
class SensorClass {
  constructor(sensor, client) {
    this.key = 'CX79NXA1V6VZMC06';
    this.channelId = 149656;
    this.sensor = sensor;
    this.client = client;

    if (sensor.initialize(11, 4)) {
      setInterval(() => this.read(), 1000);
    } else {
      console.error('Error initializing sensor');
    }

    this.client.attachChannel(this.channelId, {
      writeKey: this.key
    }, (err, res, body) => {
      console.log(err, body);
    });
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

    this.client.updateChannel(this.channelId, {
      field1: temperature,
      field2: humidity
    }, (err, resp) => {
      if (!err && resp > 0) {
        return console.log('update successfully. Entry number was: ' + resp);
      }
      console.log(err);
    });
  }
}

let sensor = new SensorClass(sensorLib, client);

sensor.read();
