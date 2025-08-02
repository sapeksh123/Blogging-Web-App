const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const db = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useunifiedTopoLogy: true,
        })
        console.log("DB Connected Successfully ");
    }
    catch (error) {
        console.error("DB Connection Failed", error);
        process.exit(1);
    }
}
module.exports= db;