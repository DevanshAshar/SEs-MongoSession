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
async function executeStudentCrudOperations() {
    let mongoClient;
    try {
        mongoClient = await connectToCluster(DB_URI);
        const db = mongoClient.db('example');
        const collection = db.collection('users');
        // const result=await collection.find({age:{$lte:30}}).toArray()
        const result=await collection.find().toArray()
        const updated=await collection.updateOne({_id:new ObjectId('663467f03008b1e81d4a5c4b')},{$set:{name:'aim'}})
        // console.log(updated)
        // const result=await collection.insertOne({name:'Dev',email:'xyz@gmail.com',age:18})
        console.log(result)
    }catch(err){
        console.log(err)
    }
     finally {
        await mongoClient.close();
    }
}
executeStudentCrudOperations()