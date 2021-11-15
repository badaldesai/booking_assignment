const chai = require('chai');

const deleteReservation = require('../../lib/controller/reserve/deleteReservation');
const data = require('../../lib/data/reservation');

const BAD_REQUEST_CODE = 400;
const NOT_FOUND = 404;

const should = chai.should();
chai.use(require('sinon-chai'));

describe('controller.deleteReservation', function () {
	it('should throw and error if id is not found', function () {
		try {
			deleteReservation.deleteReservationById();
		} catch (error) {
			should.exist(error);
			error.isBoom.should.equal(true);
			error.output.statusCode.should.equal(BAD_REQUEST_CODE);
		}
	});
	it('should throw and error if reservation not found.', function () {
		try {
			deleteReservation.deleteReservationById('123');
		} catch (error) {
			should.exist(error);
			error.isBoom.should.equal(true);
			error.output.statusCode.should.equal(NOT_FOUND);
		}
	});
	it('should successfully delete the reservation', function () {
		try {
			data.createReservation({ id: '123' });
			const response = deleteReservation.deleteReservationById('123');
			response.message.should.be.deep.equal('Reservation with 123 Deleted');
		} catch (error) {
			should.not.exist(error);
		}
	});
});
