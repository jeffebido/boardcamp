import joi from 'joi';

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).regex(/^\d+$/).required(),
    cpf: joi.string().length(11).regex(/^\d+$/).required(),
    birthday: joi.date().iso().required()
});

export default customersSchema;