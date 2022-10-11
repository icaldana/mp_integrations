"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors = require("cors");
var mercadopago = require("mercadopago");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors());
app.get('/', function (req, res) {
    res.send('Express typescript server running');
});
app.post('/preference', function (req, res) {
    var preference = {
        items: [{
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }],
        // payment_methods: {
        //     excluded_payment_methods: [{ id: "master" }
        //     ],
        //     excluded_payment_types: [{ id: "ticket" }],
        //     installments: 12
        // },
        // statement_descriptor: "ISMAEL_ONBOARDING",
        back_urls: {
            success: "http://localhost:3000",
            failure: "http://localhost:3000",
            pending: "http://localhost:3000"
        },
        auto_return: "approved",
    };
    mercadopago.preferences.create(preference)
        .then(function (response) {
        global.id = response.body.id;
        res.json({
            id: response.body.id
        });
    }).catch(function (error) {
        console.log(error);
    });
});
// app.get('/feedback', function (req: Request, res: Response) {
//     res.json({
//         Payment: req.query.payment_id,
//         Status: req.query.status,
//         MerchantOrder: req.query.merchant_order_id
//     });
// });
app.listen(port, function () {
    console.log("\u26A1\uFE0F Server is running at localhost:".concat(port, "!"));
});
