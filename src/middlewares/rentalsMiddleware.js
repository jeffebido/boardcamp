import rentalsSchema from "../schemas/rentalsSchema.js";

export async function rentalsMiddleware(req, res, next) {
   
    
    const validate = rentalsSchema.validate(req.body);

    if (validate.error) {
        return res.sendStatus(400);
    }   

  next();
}