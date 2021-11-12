const Boom = require('@hapi/boom');
const { getReservationById } = require('../../data/reservation');

module.exports = {
    getReservationById: (id) => {
        if (!id) {
            throw new Boom.badRequest(`Reservation ${id} is not given`);
        }

        return getReservationById(id);
    }
}