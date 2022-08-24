const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userschema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "first name is required"],
            trim: true,
            text: true,
        },
        last_name: {
            type: String,
            required: [true, "last name is required"],
            trim: true,
            text: true,
        },
        username: {
            type: String,
            required: [true, "username is required"],
            trim: true,
            text: true,
            unique: true,
        }
    }
);