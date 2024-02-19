import express from "express";
import { PORT ,mongoDBurl } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/' , (request , response) => {
    console.log(request)
    return response.status(234).send("Welcome to bookhaven")
})



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