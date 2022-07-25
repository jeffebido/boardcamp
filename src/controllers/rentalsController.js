import db from "../db.js";
import dayjs from 'dayjs';

export async function getRentals(req, res) {

    const rentals  = await db.query(`SELECT rentals.*, 
                                        games.name AS "gameName", 
                                        games."categoryId", 
                                        customers.name AS "customerName", 
                                        categories.name AS "categoryName" 
                                        FROM rentals
                                        JOIN games ON rentals."gameId" = games."id"
                                        JOIN categories ON games."categoryId" = categories.id
                                        JOIN customers ON rentals."customerId" = customers.id`);

    
    const result = rentals.rows.map(  (el) => {


        return ({...el,
            customer: {
                id: el.customerId,
                name: el.customerName,
            },
            game: {
                id: el.gameId,
                name: el.gameName,
                categoryId: el.categoryId,
                categoryName: el.categoryName,
            }
        });
        
    });

    
    return res.send(result);
}


export async function newRental(req, res) {

    /*Checa se cliente existe*/
    let query  = await db.query(`SELECT * FROM customers WHERE id = $1`, [req.body.customerId]);

    if(query.rows.length == 0){
        return res.sendStatus(400);
    }

    /*Checa se jogo existe*/
    query  = await db.query(`SELECT * FROM games WHERE id = $1`, [req.body.gameId]);

    if(query.rows.length == 0){
        return res.sendStatus(400);
    }

    const originalPrice = query.rows[0].pricePerDay * req.body.daysRented;

    await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                            VALUES ($1, $2, $3, $4, null, $5, null)`,
                            [req.body.customerId, req.body.gameId, dayjs(), req.body.daysRented, originalPrice]
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