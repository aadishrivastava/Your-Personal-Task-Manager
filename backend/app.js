const express=require("express");
require("dotenv").config();
require("./conn/conn");
const cors=require("cors");
const bodyParser = require("body-parser");

const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:"1mb"}));

app.use(function(req, res, next) { res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); res.setHeader('Access-Control-Allow-Credentials', true); next(); });
app.use(cors({
  origin:["http://localhost:3000"],
  Credential:true

}));



const UserAPI=require("./routes/user");
const TaskAPI=require("./routes/task");
app.use("/api/v1", UserAPI);  
app.use("/api/v2", TaskAPI);  



const PORT=1000;
app.listen(PORT,()=>{
    console.log("Server is listening to PORT 1000");

})
