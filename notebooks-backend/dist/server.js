"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
console.log('Connecting to Notebook DB init');
mongoose_1.default.connect(`${DB_URL}`).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${port}`);
    });
    console.log('Connected To Notebook DB');
}).catch((err) => console.log(err));
