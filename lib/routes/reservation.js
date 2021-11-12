const Boom = require('@hapi/boom');
const express = require('express');

const reserve = require('../controller/reserve');

module.exports = function (app) {
	const router = express.Router();

	app.use('/reserve', router);

	router.post('/', async (req, res, next) => {
		try {
            const reserveration = reserve.createReservation(req.body);
			return res.status(200).send(reserveration);
		} catch (err) {
			return next(err);
		}
	});

    router.get('/:id', async (req, res, next) => {
		try {
			const reserve_uid = req.params.id;
			const reservation = await reserve.getReservationById(reserve_uid)
			return res.status(200).send(reservation);
		} catch (err) {
			return next(err);
		}
	});

    router.delete('/:id', async (req, res, next) => {
		try {
			const reserve_uid = req.params.id;
			const reservation = await reserve.deleteReservationById(reserve_uid)
			return res.status(200).send(reservation);
		} catch (err) {
			return next(err);
		}
	});
};