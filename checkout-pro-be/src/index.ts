import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const cors = require("cors");
const mercadopago = require("mercadopago");

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.send('Express typescript server running');
});

app.post('/preference', (req: Request, res: Response) => {
    let preference = {
        items: [{
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
        }],
        back_urls: {
            success: "http://localhost:3000",
            failure: "http://localhost:3000",
            pending: "http://localhost:3000"
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
        .then(function (response: { body: { id: string; }; }) {
            global.id = response.body.id;
            res.json({
                id: response.body.id
            });
        }).catch(function (error: any) {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`⚡️ Server is running at localhost:${port}!`);
});