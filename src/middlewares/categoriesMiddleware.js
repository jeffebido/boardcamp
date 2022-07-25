import categoriesSchema from "../schemas/categoriesSchema.js";

export async function categoriesMiddleware(req, res, next) {
   
    
    const validate = categoriesSchema.validate(req.body);


    //Checa se valor for null ou string
    if (validate.error) {
        return res.sendStatus(400);
    }   

  next();
}