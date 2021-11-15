const chai = require('chai');
const express = require('express');

const should = chai.should();
const routes = require('../../lib/routes');

describe('Routes', function () {
	describe('Initialize', function () {
		it('should throw an error if app is not passed', async function () {
			try {
				routes.initialize(null);
			} catch (error) {
				should.exist(error);
				error.message.should.match(/app context is required/);
			}
		});
		it('should initialize if app is passed', async function () {
			try {
				const app = express();
				routes.initialize(app);
			} catch (error) {
				should.exist(error);
				error.message.should.match(/app context is required/);
			}
		});
	});
});
