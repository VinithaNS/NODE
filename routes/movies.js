
import express from "express";
import { getAllMovies, getMovieById, createMovies, deleteMovieById, updateMovieById } from "./helper.js";
const router=express.Router();
// /movies
router.get("/", async function (req, res) {
    // db.movies.find({})
    const movies=await getAllMovies() ;
    res.send(movies);
   });

   router.get("/:id",async  function (req, res) {
    console.log(req.params);
    const {id}=req.params;
    // db.movies.findOne({id:id})
    const movie=await getMovieById(id)


//     const movie=movies.find((mv)=>mv.id===id);
 movie   
 ? res.send(movie)
 :res.status(404).send({msg:"No msuch movie found"});
 
});

// we use nodemon its automatically restart the server
// Cursor->pagination
// toArray()->Cursor->Array
// express.json()->intercept->converting to json
// Inbuilt middleware
router.post("/",async function(req,res){
    const data=req.body;
    console.log(data);
    //   db.movies.insertMany(data)
const result=await createMovies(data)
  res.send(result) ; 
});
router.delete("/:id",async  function (req, res) {
    console.log(req.params);
    const {id}=req.params;
    // db.movies.deleteOne({id:id})
    const movie=await deleteMovieById(id)


//     const movie=movies.find((mv)=>mv.id===id);
 movie.deleteCount>0  
 ? res.send(movie)
 :res.status(404).send({msg:"No msuch movie found"});
 
});

router.put("/:id",async function(req,res){
    const data=req.body;
    console.log(data);
    const {id}=req.params;
//   db.movies.updateOne({id:id},{$set:data})
const result=await updateMovieById(id, data);
  res.send(result) ; 
});

export const moviesRouter=router;


