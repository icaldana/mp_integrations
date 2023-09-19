import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { CreatePaymentPayload } from "mercadopago/models/payment/create-payload.model";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

// mercadopago.configure({
//   access_token: String(process.env.ACCESS_TOKEN),
// });

mercadopago.configurations.setAccessToken(String(process.env.ACCESS_TOKEN));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  //res.send('Express typescript server running');
  res.sendFile(path.join(__dirname + "../../../client/cow_legacy/index.html"));
});

app.post("/preference", (req: Request, res: Response) => {
  let preference: CreatePreferencePayload = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:3000",
      failure: "http://localhost:3000",
      pending: "http://localhost:3000",
    },
    statement_descriptor: "MP INTEGRATIONS",
    external_reference: "mp_integrations",
    auto_return: "approved",
    binary_mode: false,
    // purpose: 'wallet_purchase',
    shipments: {
      cost: 1000,
      mode: "not_specified",
    },
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response: { body: { id: string } }) {
      global.id = response.body.id;
      res.json({
        preference: response.body,
      });
    })
    .catch(function (error: any) {
      console.log(error);
    });
});

app.post("/process_payment", (req: Request, res: Response) => {
  var payment_data: CreatePaymentPayload = {
    ...req.body,
    transaction_amount: req.body.transaction_amount,
    three_d_secure_mode: "optional",
  };

  console.log(payment_data);
  mercadopago.payment
    .save(payment_data)
    .then(function (response) {
      const { status, status_detail, id } = response.body;
      res.status(response.status).json({ status, status_detail, id });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at localhost:${port}!`);
});
