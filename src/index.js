import express from 'express';
import cors from 'cors';

import categories from './routes/categoriesRouter.js'
import custumers from './routes/customersRouter.js'
import games from './routes/gamesRouter.js'
import rentals from './routes/rentalsRouter.js'

const app = express();

app.use(express.json());

app.use(cors());


app.use(categories);
app.use(custumers);
app.use(games);
app.use(rentals);

app.listen(4000, '127.0.0.1', () => {
    console.log('Server is listening on port 5000.');
});