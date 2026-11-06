import express from 'express';
import { dbConnection } from './src/configs/dbConnection';
import queryHandler from './src/middlewares/queryHandler';
import cookieSession from 'cookie-session';
import { env } from './src/configs/env';
import errorHandler, { notFound } from './src/middlewares/errorHandler';

const app = express();

app.set('query parser', 'extended')
dbConnection()

app.use(express.json());

app.use(queryHandler);

app.use(cookieSession({
    name: 'personnel-api',
    secret: env.SECRET_KEY
}))


app.all('/', (req, res) => {
    res.send({
        succes: true,
        message: 'Welocome to Personnel API'
    })
});

app.all('/*splat', notFound)
app.use(errorHandler)

app.listen(8000, () => console.log("Running on port:8000"))
