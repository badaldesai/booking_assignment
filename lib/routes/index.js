const reserveration = require('./reservation');

module.exports = {
	initialize: (app) => {
		if (!app) {
			throw new Error('app context is required to initialize routes');
		}
		// register all resources
		reserveration(app);
	},
};
