import categoriesSchema from "../schemas/categoriesSchema.js";

export async function categoriesMiddleware(req, res, next) {
   
    
    const validate = categoriesSchema.validate({...req.body, type: req.header('Type')});

    if (validate.error) {
        return res.sendStatus(422);
    }

  next();
}