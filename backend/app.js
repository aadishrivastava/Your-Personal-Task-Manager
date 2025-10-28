const express=require("express");
require("dotenv").config();
require("./conn/conn");
const cors=require("cors");
const bodyParser = require("body-parser");

const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:"1mb"}));

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-personal-task-manager.netlify.app"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);



const UserAPI=require("./routes/user");
const TaskAPI=require("./routes/task");
app.use("/api/v1", UserAPI);  
app.use("/api/v2", TaskAPI);  



const PORT=1000;
app.listen(PORT,()=>{
    console.log("Server is listening to PORT 1000");

})
