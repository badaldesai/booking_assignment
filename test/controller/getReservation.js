const chai = require('chai');

const getReservation = require('../../lib/controller/reserve/getReservation');
const data = require('../../lib/data/reservation');

const BAD_REQUEST_CODE = 400;
const NOT_FOUND = 404;

const should = chai.should();
chai.use(require('sinon-chai'));

describe('controller.getReservation', function () {
	it('should throw and error if id is not found', function () {
		try {
			getReservation.getReservationById();
		} catch (error) {
			should.exist(error);
			error.isBoom.should.equal(true);
			error.output.statusCode.should.equal(BAD_REQUEST_CODE);
		}
	});
	it('should throw and error if reservation not found.', function () {
		try {
			getReservation.getReservationById('123');
		} catch (error) {
			should.exist(error);
			error.isBoom.should.equal(true);
			error.output.statusCode.should.equal(NOT_FOUND);
		}
	});
	it('should successfully return the reservation', function () {
		try {
			data.createReservation({ id: '123' });
			const response = getReservation.getReservationById('123');
			response.should.be.deep.equal({ id: '123' });
		} catch (error) {
			should.not.exist(error);
		}
	});
});
