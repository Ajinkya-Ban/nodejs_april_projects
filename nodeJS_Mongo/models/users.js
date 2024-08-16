const {MongoClient, ObjectId} = require('mongodb');
const url = "mongodb://localhost:27017"
//const url = "mongodb+srv://paypalajinkya:JMGO5mV1VMbbZo6D@employee.botnlqm.mongodb.net/?retryWrites=true&w=majority&appName=employee"
const dbName ="test"

const client = new MongoClient(url)
const connect = async() =>{

    if(!client.isConnected)
    {
        await client.connect();
    }
    return client.db(dbName);
};

const getUserCollection = async()=>
    {
    const db = await connect();
    return db.collection('users');
};

const createUser = async(user)=>
{
    const users = await getUserCollection();
    return users.insertOne(user);

};

const getUserById = async(id)=>{

    const users = await getUserCollection();
    return users.findOne({_id: new ObjectId(id)});
};

const updateUser = async(id,user)=>
{
    const users = await getUserCollection();
    return users.updateOne({_id:new ObjectId(id)},{$set:user});

};

const deleteUser = async(id)=>
{
    const users = await getUserCollection();
    return users.deleteOne({_id:new ObjectId(id)});
};

module.exports={createUser, updateUser, getUserById,deleteUser};




