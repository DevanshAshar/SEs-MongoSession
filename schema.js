import mongoose from "mongoose";
import { MongoClient } from 'mongodb';
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
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique:true
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number,
        max: [100, 'Out of age']
    }
});
//can also give default as validation i.e. if nothing is passed then that default value will be stored in db
const User = mongoose.model('User', usersSchema);

async function createUser(name, email, age) {
    try {
        const mongoClient = await connectToCluster('mongodb://localhost:27017');
        const db = mongoClient.db('mydatabase');
        const user=await User.create({name,email,age}) // can do shell commands after User like User.insertOne({}) or User.find({}) etc.
        console.log(user)
        // const collection = db.collection('users');
        // const result = await collection.insertOne({ name, email, age });
        // console.log('User created successfully:', result);
    } catch (error) {
        console.log('Error creating user:', error.message);
    }
}

createUser('Xyz Doe', 'doe108@example.com', 108);

//generally if using mongoose we connect to db in the below given method
// async function connectDb(){
//     try {
//         await mongoose.connect(DB_URL)
//         console.log('Db connected')
//     } catch (error) {
//         console.log(error)
//     }
// }