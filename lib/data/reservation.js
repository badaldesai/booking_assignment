const moment = require('moment');

let reservation = [];

module.exports = {
	getReservationById: (id) => reservation.find((res) => res.id === id),

	deleteReservation: (id) => {
		reservation = reservation.filter((res) => res.id !== id);
	},

	createReservation: (data) => {
		reservation.push(data);
	},

	getReservationByDate: (date) => reservation.filter((res) => {
		const checkIn = moment(res.checkIn_date, 'DD/MM/YYYY');
		const checkOut = moment(res.checkOut_date, 'DD/MM/YYYY');
		if (date.isBetween(checkIn, checkOut, 'days', '[)')) {
			return true;
		}
		return false;
	}),
};
