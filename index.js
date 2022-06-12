// js framework-1.express,2.koa,3.sails,4.metor,5.hapi
// 3 rd party imported
import express from "express";

import dotenv from "dotenv";

import { MongoClient } from "mongodb";
dotenv.config();
// console.log(process.env);
// const express = require('express');
const app = express();
// rest api methods-crud
// /-api path
const PORT=4000;

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
const client=await createConnection();
//  /-home
app.get('/', function (req, res) {
  res.send('Hello World 🎉');
});
// /movies
// we use nodemon its automatically restart the server
// Cursor->pagination
// toArray()->Cursor->Array

app.get("/movies", async function (req, res) {
    // db.movies.find({})
    const movies=await client.db("b33wd").collection("movies").find({}).toArray() ;
    res.send(movies);
   });

  app.get("/movies/:id",async  function (req, res) {
    console.log(req.params);
    const {id}=req.params;
    // db.movies.findOne({id:id})
    const movie=await client.db("b33wd").collection("movies").findOne({id:id})


//     const movie=movies.find((mv)=>mv.id===id);
 movie   
 ? res.send(movie)
 :res.status(404).send({msg:"No msuch movie found"});
 
});
// express.json()->intercept->converting to json
// Inbuilt middleware
app.post("/movies",async function(req,res){
    const data=req.body;
    console.log(data);
    //   db.movies.insertMany(data)
const result=await client.db("b33wd").collection("movies").insertMany(data)
  res.send(result) ; 
});
app.listen(PORT,()=>console.log(`App started in ${PORT}`));