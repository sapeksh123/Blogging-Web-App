const express = require ("express");
const dotenv  = require ("dotenv")
dotenv.config();
const cors = require("cors")
const db =  require("./src/config/db")
const app = express();
PORT = process.env.PORT;
db();
app.listen(PORT , (res,req)=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})