import express, { request, response } from "express";
import { PORT ,mongoDBurl } from "./config.js";
import mongoose from "mongoose";
//import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js"
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());



app.get('/' , (request , response) => {
    console.log(request)
    return response.status(234).send("Welcome to bookhaven")
})

app.use('/books' , bookRoute);

mongoose
    .connect(mongoDBurl)
    .then(() => {
        console.log("App connect to the database");
        app.listen(PORT , () => {
            console.log('App is listening to port :',PORT );
        });
    })
    .catch((error) => {
        console.log(error);
    })