var movement = ["forward", "backward", "left", "right"];

$( document ).ready(function() {

	socket.on('trigger', function messageReceived(message) {
    	console.log('New comet message received :: ', message);


		for (var i = 0; i < movement.length; i++) {
			console.log(movement[i]);
			if(movement[i] == message.message){
				$('#' + movement[i] ).button('toggle')
			}
		};

	});
});