let reservation = [];

module.exports = {
    getReservationById: (id) => {
        return reservation.find((res) => res.id === id);
    },

    deleteReservation: (id) => {
       reservation = reservation.filter((res) => res.id != id);
    },

    createReservation: (data) => {
        reservation.push(data);
    },

    getReservationByDate: (date) => {
        return reservation.filter((res) => {
            if(res.checkIn <= date && date < res.checkOut) {
                return true;
            }
            return false;
        });
    }
}