import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { noteRouter } from './routers';
import cors, { CorsOptions } from 'cors'; 
const app = express();
const port = process.env.PORT;

const DB_URL = process.env.DB_URL;

app.use(bodyParser.json());
const corsOptions :CorsOptions= {
    origin: 'http://127.0.0.1:4200',
    optionsSuccessStatus: 200
}

app.use('/api/notes', noteRouter);
app.use(cors(corsOptions));
console.log('Connecting to Note DB init');

mongoose.connect(`${DB_URL}`).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Listening to port ${port}`);
    })
    console.log('Connected To Note DB')
}).catch((err)=> console.log(err))




