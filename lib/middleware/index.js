const express = require('express');
const cors = require('cors');

/**
 * This module contains express middleware.
 * Middleware authenicate any request comes to API.
 * Error Handlers middleware will intercept responses and send proper error codes to the client.
 */
module.exports = {

	registerErrorHandlers: (app) => {
		// eslint-disable-next-line no-unused-vars
		app.use((req, res, next) => {
			console.warn('404: %s %s', req.method, req.url);
			return res.status(404).json({ error: 'resource not found' });
		});

		// unhandled exceptions
		// eslint-disable-next-line no-unused-vars
		app.use((err, req, res, next) => {
			if (err.isBoom) {
				err.status = err.output.statusCode;
				err.body = err.output.payload;
			}
			err.body = err.body || err;
			if (err.status) {
				if (err.status >= 400 && err.status < 500) {
					console.warn('%s: %s %s', err.status, req.method, req.url);
				} else {
					console.error('%s: %s %s', err.status, req.method, req.url);
					console.error(err);
				}
			} else {
                console.error('Error reported:', err);
                return res.status(500).send('Internal Server Error');
            }
			return res.status(err.status).json(err.body);
		});
	},

	registerMiddleware: (app) => {
		// for API body parsing and cross-origin request support
		app.use(express.json());
		app.use(cors());

		// request logging
		app.use((req, res, next) => {
			console.trace('%s %s', req.method, req.url);
			return next();
		});
	},
};
