import db from "../db.js";

export async function getGames(req, res) {


    let query  = `SELECT games.*, categories.name AS "categoryName" FROM games
                        JOIN categories
                        ON games."categoryId" = categories.id `;


    if(req.query.name){
        query = query + ` WHERE games.name ILIKE '${req.query.name}%'`;
    }

    const data  = await db.query(query);

    return res.send(data.rows);
}

export async function newGame(req, res) {

    

    /*Checa se categoria existe*/
    let query  = await db.query(`SELECT * FROM categories WHERE id = $1`, [req.body.categoryId]);

    if(query.rows.length == 0){
        return res.sendStatus(400);
    }

    /*Checa se jogo já existe*/
    query  = await db.query(`SELECT * FROM games WHERE name = $1`, [req.body.name]);

    if(query.rows.length > 0){
        return res.sendStatus(409);
    }


    await db.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, 
                    [req.body.name, req.body.image, req.body.stockTotal, req.body.categoryId, req.body.pricePerDay]
    );
    
    return res.sendStatus(201); 
}