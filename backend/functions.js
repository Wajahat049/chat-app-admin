const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");

var mongoResult;

//load MongoDb
async function loadMongoDb() {
    const uri =
        "mongodb+srv://wajahat:wajju123%40@cluster0.fhtdu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });
    mongoResult = await client.connect();
    // console.log("mongoResult", mongoResult)
}

//getChat
async function getChatData() {
    let collection = mongoResult.db("ComputerHiTech").collection("Chat");
    let response = await collection.find({}).toArray();
    // console.log("get chat data response", response)
    return response;
}

// send msg from user
const sendMsg = async (req, res) => {
    console.log("email", req.body.email)
    let collection = mongoResult.db("ComputerHiTech").collection("Chat");
    var newvalues = { $set: { messages: req.body.messages } };
    console.log("result of send msg", newvalues)
    collection.updateOne({ email: req.body.email }, newvalues, (result, err) => {
        res.status(200).send({ message: "Successfully send msg" })
        console.log("result of send msg", err)
        return
    })

}

module.exports = { loadMongoDb, getChatData, sendMsg }