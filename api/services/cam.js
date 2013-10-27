// EmailService.js - in api/services

	var camelot = require('camelot');

	var camera = new camelot({
		'device': '/dev/video0',
		'jpeg': '95',
		'resolution': '160x120',
		'no-banner': ''
	});

	//when we get a frame from the camera,
	camera.on('frame', function(imagedata) {
		//console.log('sending frame');
		//convert to base64 string to transfer
		var image64 = imagedata.toString('base64');
		//and send 
		sails.io.sockets.emit('frame', {
			'imagedata': image64
		});

	});

	//log errors!
	camera.on('error', function(error) {
		console.log(error);
	});



exports.createCam = function() {

	//initiate camera recording - note: frequency = frames per second
	camera.grab({
		'title': 'Camera1',
		'font': 'Arial:24',
		'frequency': .32
	});

	return camera;
};
