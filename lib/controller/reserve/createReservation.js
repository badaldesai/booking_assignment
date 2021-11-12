const Boom = require('@hapi/boom');
const _ = require('lodash');
const reservation = require('../../data/reservation');
const uuid = require('uuid');

module.exports = {
    createReservation: (data) => {
        if (_.isEmpty(data)) {
            throw new Boom.badRequest('Reservation data is not given');
        }

        let booking = reservation.getReservationByDate(data.checkInDate);
        if (!_.isEmpty(booking)) {
            throw new Boom.conflict('There is already booking for this date, please try some other date');
        }

        booking = reservation.getReservationByDate(data.checkOutDate);
        if (!_.isEmpty(booking)) {
            throw new Boom.conflict('There is already booking for this date, please try some other date');
        }

        const id = uuid.v4().replace('-', '');
        reservation.createReservation({
            id,
            ...data
        });
        return {
            id,
            message: 'You can cancel/retrieve this reserveration using this Id and retrieve GET /:id or DELETE /:id'
        };
    }
}