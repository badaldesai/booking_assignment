const JoiImport = require('joi');
const JoiDate = require('@hapi/joi-date');

const Joi = JoiImport.extend(JoiDate);
const createReservationValidation = Joi.object({
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	email: Joi.string().email({ tlds: { allow: false } }).required(),
	number_of_people: Joi.number().max(3).required(),
	checkIn_date: Joi.date()
		.format('DD/MM/YYYY').greater('now')
		.required(),
	checkOut_date: Joi.date()
		.format('DD/MM/YYYY').greater(Joi.ref('checkIn_date'))
		.required(),
});

module.exports = {
	createReservationValidation,
};
