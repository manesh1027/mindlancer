const Joi = require('joi');

const createJobSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10),
    budgetMin: Joi.number().required().min(0),
    budgetMax: Joi.number().required().greater(Joi.ref('budgetMin')),
    status: Joi.string().valid('active', 'completed', 'cancelled')
});

module.exports = {
    createJobSchema
};
