/**
 * HomeController
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



var post = {};
module.exports = {


	/**
	 * Action blueprints:
	 *    `/home/index`
	 *    `/home`
	 */
	index: function(req, res) {

		// Send a JSON response


		post.active = 'home';

		res.view("home/index", {
			post: post
		});
	},


	/**
	 * Action blueprints:
	 *    `/home/control`
	 */
	control: function(req, res) {

		post.active = 'control';

		return res.view("home/control", {
			post: post
		})
	},


	/**
	 * Action blueprints:
	 *    `/home/remote`
	 */
	remote: function(req, res) {

		post.active = 'remote';

		return res.view("home/remote", {
			post: post
		})
	},

	cam: function(req, res) {

		cam.createCam();

		res.view("home/cam", {
			post: post
		})

	},



	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to HomeController)
	 */
	_config: {}


};