const Joi = require('joi');

const registerNgoValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(6).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    });
    return schema.validate(data);
};

const createDonationValidation = (data) => {
    const schema = Joi.object({
        restaurantName: Joi.string().required(),
        description: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        foodName: Joi.string().optional(),
        quantity: Joi.string().optional(),
        expiresAt: Joi.date().optional()
    });
    // Note: foodName, quantity, freshness are derived from AI or optional overrides
    return schema.validate(data);
};

module.exports = {
    registerNgoValidation,
    createDonationValidation
};
