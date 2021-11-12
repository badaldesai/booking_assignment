const { createReservation } = require('./createReservation');
const { deleteReservationById } = require('./deleteReservation');
const { getReservationById } = require('./getReservation');

module.exports = {
	createReservation,
	deleteReservationById,
	getReservationById,
};
