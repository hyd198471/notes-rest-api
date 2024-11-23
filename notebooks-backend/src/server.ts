import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT;

const DB_URL = process.env.DB_URL;

app.get('/api/notebooks', (req, res) => {
    res.json({ message:'Hello World notebooks!' });
  });
  
console.log('Connecting to Notebook DB init');

mongoose.connect(`${DB_URL}`).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Listening to port ${port}`);
    })
    console.log('Connected To Notebook DB')
}).catch((err)=> console.log(err))




