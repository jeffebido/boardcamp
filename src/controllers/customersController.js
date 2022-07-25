import db from "../db.js";

export async function getCustomers(req, res) {


    let query  = `SELECT * FROM customers`;


    if(req.query.cpf){
        query = query + ` WHERE cpf LIKE '${req.query.cpf}%'`;
    }

    const data  = await db.query(query);

    return res.send(data.rows);
}

export async function getCustomersById(req, res) {

    const { id } = req.params;

    const query  = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);

    if(query.rows.length == 0){
        return res.sendStatus(404);
    }

    return res.send(query.rows);
}

export async function newCustomer(req, res) {

    /*Checa se cpf já existe*/
    const query  = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [req.body.cpf]);

    if(query.rows.length > 0){
        return res.sendStatus(409);
    }



    await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, 
                    [req.body.name, req.body.phone, req.body.cpf, req.body.birthday]
    );
    
    return res.sendStatus(201); 
}

export async function updateCustomer(req, res) {

    const { id } = req.params;

    /*Checa se cpf já existe*/
    const query  = await db.query(`SELECT * FROM customers WHERE cpf = $1 AND id != $2`, [req.body.cpf, id]);

    if(query.rows.length > 0){
        return res.sendStatus(409);
    }



    await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5 `, 
                    [req.body.name, req.body.phone, req.body.cpf, req.body.birthday, id]
    );
    
    return res.sendStatus(200); 
}