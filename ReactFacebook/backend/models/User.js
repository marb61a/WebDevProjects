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
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        picture: {
            type: String,
            trim: true,
            default: "",
        },
        cover: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            required: [true, "gender is required"],
            trim: true,
        },
        bYear: {
            type: Number,
            required: true,
            trim: true,
        },
        bMonth: {
            type: Number,
            required: true,
            trim: true,
        },
        bDay: {
            type: Number,
            required: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        
    }
);