const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profileImageUrl: {
        Type: String,
        default: "./public/Profile.png"
    },
     role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
    { timestamps: true }
)

const User = model("user", UserSchema);

module.exports=User;