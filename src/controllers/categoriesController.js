import db from "../db.js";

export async function getCategories(req, res) {

    const query  = await db.query(`
        SELECT * FROM categories
    `);

    return res.send(query.rows);
}

export async function newCategorie(req, res) {


}