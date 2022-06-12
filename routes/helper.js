import { client } from "../index.js";

export async function updateMovieById(id, data) {
    return await client.db("b33wd").collection("movies").updateOne({ id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db("b33wd").collection("movies").deleteOne({ id: id });
}
export async function createMovies(data) {
    return await client.db("b33wd").collection("movies").insertMany(data);
}
export async function getMovieById(id) {
    return await client.db("b33wd").collection("movies").findOne({ id: id });
}
export async function getAllMovies() {
    return await client.db("b33wd").collection("movies").find({}).toArray();
}
