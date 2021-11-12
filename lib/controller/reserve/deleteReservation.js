const Boom = require('@hapi/boom');
const reservation = require('../../data/reservation');

module.exports = {
	deleteReservationById: (id) => {
		if (!id) {
			throw Boom.badRequest(`Reservation ${id} is not given`);
		}

		const booking = reservation.getReservationById(id);
		if (!booking) {
			throw Boom.notFound(`Reservation with ${id} is not found.`);
		}

		reservation.deleteReservation(id);
		return {
			message: `Reservation with ${id} Deleted`,
		};
	},
};
