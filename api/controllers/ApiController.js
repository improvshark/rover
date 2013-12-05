/**
 * ApiController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */



module.exports = {


	index: function(req, res) {
		myLib.pi.initGpio();

		sails.io.sockets.on('command', function(data) {
			console.log("received emit!!!!!");
			console.log(data);


			switch (data.command) {
				case "f":
					myLib.pi.motor1.forward(data.on);
					break;
				case "b":
					myLib.pi.motor1.backward(data.on);
					break;
				case "l":
					myLib.pi.motor2.forward(data.on);
					break;
				case "r":
					myLib.pi.motor2.backward(data.on);
					break;
				case "a":

					break;
			}
		});


		if (req.isSocket) {
			var message = req.param('message');
			var on = req.param('on');

			// Send a JSON response
			var directions = ['forward', 'backward', 'left', 'right'];

			for (var i = 0; i < directions.length; i++) {
				if (message == directions[i] && on) {
					res.json({
						success: true,
						message: directions[i] + ' on received'
					});
					sails.io.sockets.emit('trigger', {
						message: directions[i],
						on: on
					});
				}
			}
			if (!on) {
				res.json({
					success: true,
					message: 'all' + ' off received'
				});
				sails.io.sockets.emit('trigger', {
					message: 'all',
					on: on
				});
			}


			console.log('message:' + message + ' on:' + on);


			switch (message) {
				case "forward":
					myLib.pi.motor1.forward(on);
					break;
				case "backward":
					myLib.pi.motor1.backward(on);
					break;
				case "left":
					myLib.pi.motor2.forward(on);
					break;
				case "right":
					myLib.pi.motor2.backward(on);
					break;
				case "allOff":

					break;
			}



			if (message == 'led') {
				myLib.pi.led();
				res.json({
					success: true,
					message: message + 'received'
				});
				sails.io.sockets.emit('trigger', {
					message: 'led'
				});
			}
		}



	},

	// cam: function(req, res) {
	// 	if (req.isSocket) {
	// 		res.json({
	// 			success: true,
	// 			image: directions[i] + ' on received'
	// 		});
	// 	}
	// },

	post: function(req, res) {


		myLib.pi.initGpio();

		console.log("got something!");
		var command = req.param('direction');
		
		if (req.param('on') == "true") {
			var on = true;
		} else {
			var on = false;
		}

		console.log(command);
		console.log(on);

		switch (command) {
			case "f":
				myLib.pi.motor1.forward(on);
				break;
			case "b":
				myLib.pi.motor1.backward(on);
				break;
			case "l":
				myLib.pi.motor2.forward(on);
				break;
			case "r":
				myLib.pi.motor2.backward(on);
				break;
			case "allOff":

				break;
		}


		res.send();

	},

	test: function(req, res) {
		sails.io.sockets.emit('message', {
			message: 'led'
		});

		res.json({
			success: true,
			message: directions[i] + ' on received'
		});

	},


	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to ApiController)
	 */
	_config: {}


};