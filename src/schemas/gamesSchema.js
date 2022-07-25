import joi from 'joi';

const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().positive().greater(0).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().positive().greater(0).required()
});

export default gamesSchema;