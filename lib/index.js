const express = require('express');
const routes = require('./routes');
const middleware = require('./middleware');

const PORT = process.env.PORT || 3000;

function setupResources(app) {
	console.info('loading resources');
	middleware.registerMiddleware(app);
	routes.initialize(app);
	middleware.registerErrorHandlers(app);
}

/**
 * Intialize the express app at particular port and set up routes
 */
function startServer(app) {
	setupResources(app);
	app.listen(PORT, (err) => {
		if (err) {
			console.error('Error in server setup', err);
			process.exit(1);
		}
		console.info(`API Server Started at port ${PORT}`);
	});
}

startServer(express());
