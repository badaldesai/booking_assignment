/* eslint-disable global-require */
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const routes = require('../lib/routes');

const should = chai.should();
describe('server.index', function () {
	beforeEach(function () {
		const moduleId = require.resolve('../lib');
		if (moduleId) {
			delete require.cache[moduleId];
		}
		sinon.stub(routes, 'initialize').returns();
		sinon.stub(console, 'error').returns();
		sinon.stub(process, 'exit').returns();
	});

	afterEach(function () {
		sinon.restore();
	});

	it('should throw an error if routes.initialize throws error', function () {
		routes.initialize.throws('routes error');
		try {
			require('../lib');
			routes.initialize.should.be.calledOnce;
			console.error.should.not.be.called;
			process.exit.should.not.be.calledOnce;
		} catch (error) {
			should.not.exist(error);
		}
	});

	it('should throw an error if routes.initialize throws error', function () {
		routes.initialize.throws('routes error');
		try {
			require('../lib');
		} catch (error) {
			should.exist(error);
			routes.initialize.should.be.calledOnce;
			console.error.should.be.calledOnce;
			process.exit.should.be.calledOnce;
		}
	});
});
