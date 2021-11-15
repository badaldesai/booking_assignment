const Boom = require('@hapi/boom');
const _ = require('lodash');
const uuid = require('uuid');
const moment = require('moment');
const reservation = require('../../data/reservation');

module.exports = {
	createReservation: (data) => {
		const checkIn_date = moment(data.checkIn_date, 'DD/MM/YYYY');
		const checkOut_date = moment(data.checkOut_date, 'DD/MM/YYYY');
		if (checkOut_date.isAfter(checkIn_date.clone().add(3, 'days'))) {
			throw Boom.badRequest('Maximum three days stay is allowed.');
		}
		let booking = reservation.getReservationByDate(checkIn_date);
		if (!_.isEmpty(booking)) {
			throw Boom.conflict('There is already booking for this date, please try some other date');
		}

		booking = reservation.getReservationByDate(checkOut_date);
		if (!_.isEmpty(booking)) {
			throw Boom.conflict('There is already booking for this date, please try some other date');
		}

		const id = uuid.v4().replace(/-/g, '');
		reservation.createReservation({
			id,
			...data,
		});
		return {
			id,
			message: 'You can retrieve/cancel this reserveration using this Id and retrieve GET /:id or DELETE /:id',
		};
	},
};
