import express from 'express'
const app=express()
app.use(express.json())
const DB_URI='mongodb://localhost:27017'
import { MongoClient, ObjectId } from 'mongodb';
async function connectToCluster(uri) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB failed!', error);
        process.exit();
    }
}
let mongoClient
mongoClient = await connectToCluster(DB_URI);
const db = mongoClient.db('example');
app.get('/',async(req,res)=>{
    try {
        const collection = db.collection('users');
        const result=await collection.find().toArray()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
app.post('/',async(req,res)=>{
    try {
        const collection = db.collection('users');
        const result=await collection.insertOne(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
app.put('/:id',async(req,res)=>{
    try {
        const collection = db.collection('users');
        const updated=await collection.updateOne({_id:new ObjectId(req.params.id)},{$set:req.body})
        res.status(200).json(updated)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
app.delete('/:id',async(req,res)=>{
    try {
        const collection = db.collection('users');
        const deleted=await collection.deleteOne({_id:new ObjectId(req.params.id)})
        res.status(200).json(deleted)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
app.listen(5001,()=>{
    console.log('Server running on 5001')
})