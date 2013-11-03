function down(argument) {
	return function(event) {
		socket.get('/api', {
			message: argument,
			on: true
		}, function(responce) {
			if (responce.success) {
				console.log(responce.message);
			} else {
				console.log('failed')
			}
		})
	}
}

function up(argument) {
	return function(event) {
		socket.get('/api', {
			message: argument,
			on: false
		}, function(responce) {
			if (responce.success) {
				console.log(responce.message);
			} else {
				console.log('failed')
			}
		})
	}
}

var movement = ["forward", "backward", "left", "right", 'led'];
//$(window).mouseup(up('none'));

for (var i = 0; i < movement.length; i++) {
	//console.log(movement[i]);
	$('#' + movement[i]).mousedown(down(movement[i]));
	$('#' + movement[i]).mouseup(up(movement[i]));

};


var img;

$(document).ready(function() {

	img = document.getElementById("frame");
	socket.on('frame', function messageReceived(data) {
		//console.log('New comet message received :: ', data);
        img.src="data:image/jpeg;base64, " + data.imagedata;
        
	});

});