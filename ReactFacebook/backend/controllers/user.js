const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const {
    validateEmail,
    validateLength,
    validateUsername,
} = require("../helpers/validation");

exports.register = async(req, res) => {
    try{
        const {
            first_name,
            last_name,
            email,
            password,
            username
        } = req.body;

        // Check email address
        if(!validateEmail(email)){

        }
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};