const express = require('express');
const sinon = require('sinon');
const chai = require('chai');
const supertest = require('supertest');
const reserveRoute = require('../../lib/routes/reservation');
const reserveController = require('../../lib/controller/reserve');
const middleware = require('../../lib/middleware');

chai.should();

describe('Reservation Routes', function () {
	const fakeReserve = { _id: 'job1' };
	beforeEach(() => {
		sinon.stub(reserveController, 'createReservation').returns({ id: '123' });
		sinon.stub(reserveController, 'deleteReservationById').returns('deleted');
		sinon.stub(reserveController, 'getReservationById').returns(fakeReserve);
	});
	afterEach(() => {
		sinon.restore();
	});
	describe('POST /reserve', function () {
		it('should return 201 if the route is setup correctly', async function () {
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			const mockRequest = {
				first_name: 'Badal',
				last_name: 'Desai',
				email: 'bad@gmail.com',
				number_of_people: 2,
				checkIn_date: '29/12/2021',
				checkOut_date: '30/12/2021',
			};
			const request = supertest(app);
			const response = await request.post('/reserve')
				.send(mockRequest)
				.expect(201);
			response.body.should.be.deep.equal({ id: '123' });
		});
		it('should return error if the route is setup not correctly', () => {
			reserveController.createReservation.throws({
				name: 'BadRequestError',
				statusCode: 400,
			});
			const mockRequest = {
				first_name: 'Badal',
				last_name: 'Desai',
				email: 'bad@gmail.com',
				number_of_people: 2,
				checkIn_date: '29/12/2021',
				checkOut_date: '30/12/2021',
			};
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			const request = supertest(app);
			return request.post('/reserve')
				.send(mockRequest)
				.expect(400);
		});
		it('should return error if the validation failed', () => {
			const mockRequest = {
				first_name: 'Badal',
				last_name: 'Desai',
				email: 'bad@gmail.com',
				number_of_people: 5,
				checkIn_date: '29/12/2021',
				checkOut_date: '30/12/2021',
			};
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			middleware.registerErrorHandlers(app);
			const request = supertest(app);
			return request.post('/reserve')
				.send(mockRequest)
				.expect(400);
		});
	});

	describe('GET /reserve/:id', function () {
		it('should return 200 if the route is setup correctly', async function () {
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			middleware.registerErrorHandlers(app);
			const request = supertest(app);
			const response = await request.get('/reserve/123')
				.expect(200);
			response.body.should.be.deep.equal(fakeReserve);
		});
		it('should return error if the route is setup not correctly', function () {
			reserveController.getReservationById.throws({
				name: 'BadRequestError',
				statusCode: 400,
			});
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			const request = supertest(app);
			return request.get('/reserve/123')
				.expect(400);
		});
	});

	describe('DELETE /reserve/:id', function () {
		it('should return 200 if the route is setup correctly', function () {
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			middleware.registerErrorHandlers(app);
			const request = supertest(app);
			return request.delete('/reserve/123')
				.expect(200);
		});
		it('should return error if the route is setup not correctly', () => {
			reserveController.deleteReservationById.throws({
				name: 'BadRequestError',
				statusCode: 400,
			});
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			const request = supertest(app);
			return request.delete('/reserve/123')
				.expect(400);
		});
		it('should return internal server error if there some kind of error', () => {
			reserveController.deleteReservationById.throws({
				name: 'Server',
				statusCode: 500,
			});
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			middleware.registerErrorHandlers(app);
			const request = supertest(app);
			return request.delete('/reserve/123')
				.expect(500);
		});
	});

	describe('Other route', function () {
		it('should return 404 for any other route', function () {
			const app = express();
			middleware.registerMiddleware(app);
			reserveRoute(app);
			middleware.registerErrorHandlers(app);
			const request = supertest(app);
			return request.post('/reserve/123')
				.expect(404);
		});
	});
});
