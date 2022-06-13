// js framework-1.express,2.koa,3.sails,
// 3 rd party imported
import express from "express";

import dotenv from "dotenv";

import { MongoClient } from "mongodb";

import cors from "cors";

import { moviesRouter } from "./routes/movies.js";
dotenv.config();

// console.log(process.env.MONGO_URL);
// const express = require('express');
const app = express();
//  const PORT=4000;
app.use(cors());
// rest api methods-crud
// /-api path
const PORT=process.env.PORT;

app.use(express.json());
//  const MONGO_URL="mongodb://localhost";
const MONGO_URL=process.env.MONGO_URL;
async function createConnection(){
    const client=new MongoClient(MONGO_URL)
        await client.connect();
        console.log("Mongodb is connected");
     return client;
    }
    // Top level await
 export const client=await createConnection();
//  /-home
app.get('/', function (req, res) {
  res.send('Hello World 🎉');
});

app.use("/movies",moviesRouter);


app.listen(PORT,()=>console.log(`App started in ${PORT}`));