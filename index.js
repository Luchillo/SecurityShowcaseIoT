var request = require('request') ;
var sensorLib = require('node-dht-sensor');
// Read from sensor & send to Dweet.io
var sensor = {
  initialize: function () {
      return sensorLib.initialize(11, 4);
  },
  read: function () {

      // Read from sensor
	var readout = sensorLib.read();
	var temperature = readout.temperature.toFixed(2);
	var humidity = readout.humidity.toFixed(2);
	console.log('Temperature: ' + temperature + 'C, ' +
          'humidity: ' + humidity + '%');
	if(temperature>29){
		console.log('alarm');
	}
 
	request
  }
};

// Initialize DHT11 sensor
if (sensor.initialize()) {
      setInterval(function () {
          sensor.read();
      }, 1000);
} else {
    console.warn('Failed to initialize sensor');
}
