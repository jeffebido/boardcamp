import db from "../db.js";

export async function getCategories(req, res) {



    const query  = await db.query(`
        SELECT * FROM categories
    `);

    return res.send(query.rows);
}

export async function newCategorie(req, res) {

    const query  = await db.query(`SELECT * FROM categories WHERE name = $1`, [req.body.name]);

    if(query.rows.length > 0){
        return res.sendStatus(409);
    }

    await db.query(`INSERT INTO categories (name) VALUES ('${req.body.name}')`);

    return res.sendStatus(201);
}