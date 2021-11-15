const chai = require('chai');

const createReservation = require('../../lib/controller/reserve/createReservation');
const data = require('../../lib/data/reservation');

const BAD_REQUEST_CODE = 400;
const CONFLICT = 409;

const should = chai.should();
chai.use(require('sinon-chai'));

describe('controller.createReservation', function () {
	it('should throw and error if checkout date is more than three days', function () {
		try {
			createReservation.createReservation({ checkIn_date: '20/12/2021', checkOut_date: '29/12/2021' });
		} catch (error) {
			should.exist(error);
			error.isBoom.should.equal(true);
			error.output.statusCode.should.equal(BAD_REQUEST_CODE);
		}
	});
	it('should throw and error if checkIn is in range between checkIn and checkout', function () {
		try {
			data.createReservation({ checkIn_date: '28/12/2021', checkOut_date: '30/12/2021' });
			createReservation.createReservation({ checkIn_date: '29/12/2021', checkOut_date: '31/12/2021' });
		} catch (error) {
			should.exist(error);
			error.isBoom.should.equal(true);
			error.output.statusCode.should.equal(CONFLICT);
		}
	});
	it('should throw and error if checkOut is in range between checkIn and checkout', function () {
		try {
			data.createReservation({ checkIn_date: '28/12/2021', checkOut_date: '30/12/2021' });
			createReservation.createReservation({ checkIn_date: '27/12/2021', checkOut_date: '29/12/2021' });
		} catch (error) {
			should.exist(error);
			error.isBoom.should.equal(true);
			error.output.statusCode.should.equal(CONFLICT);
		}
	});

	it('should create reservation if everything is proper.', function () {
		try {
			data.createReservation({ checkIn_date: '28/12/2021', checkOut_date: '30/12/2021' });
			createReservation.createReservation({ checkIn_date: '20/12/2021', checkOut_date: '22/12/2021' });
		} catch (error) {
			should.not.exist(error);
		}
	});
});
