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
		}



	},


	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to ApiController)
	 */
	_config: {}


};