import express, { request, response } from "express";
import { PORT ,mongoDBurl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get('/' , (request , response) => {
    console.log(request)
    return response.status(234).send("Welcome to bookhaven")
})

app.post('/books' , async (request , response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send(
                {
                    message:"Fill all required fileds"
                }
            );
        }

        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear
        }

        const book = await Book.create(newBook)
        return response.status(201).send(book) 
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:error.message})  
    }
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