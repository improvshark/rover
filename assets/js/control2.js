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

$(document).keydown(function(evt) {

	console.log('key up : ' + evt.which);
	switch (evt.which) {
		case 37: // left
			evt.preventDefault();
			socket.emit("command", {command: "l", on: 1});
			break;
		case 38: // up
			evt.preventDefault();
			socket.emit("command", {command: "f", on: 1});
			break;
		case 39: // right
			evt.preventDefault();
			socket.emit("command", {command: "r", on: 1});
			break;
		case 40: // down
			evt.preventDefault();
			socket.emit("command", {command: "b"});
			break;
	}
});


$(document).keyup(function(evt) {

	console.log('key up : ' + evt.which);
	switch (evt.which) {
		case 37: // left
			evt.preventDefault();
			up("left")();
			break;
		case 38: // up
			evt.preventDefault();
			up("forward")();
			break;
		case 39: // right
			evt.preventDefault();
			up("right")();
			break;
		case 40: // down
			evt.preventDefault();
			up("backward")();
			break;
	}
});

var img;

$(document).ready(function() {

	img = document.getElementById("frame");
	socket.on('frame', function messageReceived(data) {
		//console.log('New comet message received :: ', data);
		img.src = "data:image/jpeg;base64, " + data.imagedata;

	});

});