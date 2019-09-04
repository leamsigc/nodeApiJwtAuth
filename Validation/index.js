//VALIDATION
const Joi = require('@hapi/joi');

module.exports.RegisterValidation = data => {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(30)
			.required(),
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.required(),
		password: Joi.string()
			.min(8)
			.required()
	};
	return Joi.validate(data, schema);
};
module.exports.LoginValidation = data => {
	const schema = {
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.required(),
		password: Joi.string()
			.min(8)
			.required()
	};
	return Joi.validate(data, schema);
};
