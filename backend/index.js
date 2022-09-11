const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");
const{loadMongoDb,getChatData, sendMsg} = require("./functions.js")

loadMongoDb()

// For AllUsers
app.get("/AllChats", (req, res) => {
  var resp = getChatData();
  resp.then((e) => {
    res.send(e);
  });
});

// For send message
app.post("/sendMsg", (req, res) => {
  console.log("sendMsg", req.body);
  sendMsg(req, res);
});



const PORT = process.env.PORT || 8002;

const server = app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
  
});


const io = socket(server);

// make a connection with the user from server side
io.on('connection', (socket)=>{
  console.log('New user connected');
  socket.on("disconnect", () => {
    console.log("User disconnected");
    
  });
});
