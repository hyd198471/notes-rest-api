import express from "express";
import mongoose from "mongoose";
import cors, { CorsOptions } from "cors";
import { notebookRouter } from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT;

const DB_URL = process.env.DB_URL;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:4200", "http://127.0.0.1:4200"];

    // Allow requests with no origin (like Postman) or match allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // Include if cookies or auth headers are needed
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api/notebooks", notebookRouter);
console.log("Connecting to Notebook DB init");

mongoose
  .connect(`${DB_URL}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${port}`);
    });
    console.log("Connected To Notebook DB");
  })
  .catch((err) => console.log(err));
