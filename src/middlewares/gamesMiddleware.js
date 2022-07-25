import gamesSchema from "../schemas/gamesSchema.js";

export async function gamesMiddleware(req, res, next) {
   
    
    const validate = gamesSchema.validate(req.body);

    if (validate.error) {
        return res.sendStatus(400);
    }   

  next();
}