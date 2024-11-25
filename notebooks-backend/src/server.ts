import express from 'express';
import mongoose from 'mongoose';
import { notebookRouter } from './routes';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT;

const DB_URL = process.env.DB_URL;

app.use(bodyParser.json());
app.use('/api/notebooks', notebookRouter);
console.log('Connecting to Notebook DB init');

mongoose.connect(`${DB_URL}`).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Listening to port ${port}`);
    })
    console.log('Connected To Notebook DB')
}).catch((err)=> console.log(err))




