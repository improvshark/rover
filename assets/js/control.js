
function down (argument) {
	return function(event) {
		socket.get('/api', {message: argument, on: true}, function (responce) {
			if(responce.success){
				console.log(responce.message);
			} else {
				console.log('failed')
			}
		})
	}
}

function up (argument) {
	return function(event) {
		socket.get('/api', {message: argument, on: false}, function (responce) {
			if(responce.success){
					console.log(responce.message);
			} else {
				console.log('failed')
			}
		})
	}
}

var movement = ["forward", "backward", "left", "right"];

for (var i = 0; i < movement.length; i++) {
	console.log(movement[i]);
	$('#' + movement[i] ).mousedown( down(movement[i]));
	$(window ).mouseup( up(movement[i]));
};



