import customersSchema from "../schemas/customersSchema.js";

export async function customersMiddleware(req, res, next) {
   
    
    const validate = customersSchema.validate(req.body);

    if (validate.error) {
        return res.sendStatus(400);
    }   

  next();
}