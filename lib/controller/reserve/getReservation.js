const Boom = require('@hapi/boom');
const _ = require('lodash');
const { getReservationById } = require('../../data/reservation');

module.exports = {
	getReservationById: (id) => {
		if (!id) {
			throw Boom.badRequest(`Reservation ${id} is not given`);
		}
		const reservation = getReservationById(id);

		if (_.isEmpty(reservation)) {
			throw Boom.notFound('Reservation not found');
		}

		return getReservationById(id);
	},
};
