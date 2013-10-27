function toggleLed () {
	if ( $('#led').hasClass('label-default') ){
		$('#led').removeClass('label-default')
		$('#led').addClass('label-success')
	}
	else {
		$('#led').removeClass('label-success')
		$('#led').addClass('label-default')
	}
}

var movement = ["forward", "backward", "left", "right"];

$(document).ready(function() {

	socket.on('trigger', function messageReceived(message) {
		console.log('New comet message received :: ', message);


		for (var i = 0; i < movement.length; i++) {
			if (movement[i] == message.message && message.on) {
				$('#' + movement[i]).button('toggle')
			}
			if (!message.on) {
				if ($('#' + movement[i]).hasClass('active')) {
					$('#' + movement[i]).button('toggle')
				}
			}
		};

		if(message.message == 'led'){ toggleLed(); }

	});
});