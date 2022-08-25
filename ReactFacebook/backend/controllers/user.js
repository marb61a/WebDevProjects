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
            username,
            bYear,
            bMonth,
            bDay,
            gender,
        } = req.body;

        // Check email address
        if(!validateEmail(email)){
            return res.status(400).json({
                message: "invalid email address",
            });
        }

        // Check user email address to avoid duplicates
        const check = await User.findOne({ email });
        if(check){
            return res.status(400).json({
                message: "This email address already exists,try with a different email address"
            });
        }

        // Validate details (first name, last name and password)
        if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
                message: "First name must between 3 and 30 characters.",
            });
        }
        if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
                message: "Last name must between 3 and 30 characters.",
            });
        }
        if (!validateLength(password, 6, 40)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters.",
            });
        }
        const cryptedPassword = await bcrypt.hash(password, 12);

        // Creating new user
        let tempUsername = first_name + last_name;
        let newUsername = await validateUsername(tempUsername);
        const user = await new User({
            first_name,
            last_name,
            email,
            password: cryptedPassword,
            username: newUsername,
            bYear,
            bMonth,
            bDay,
            gender,
        }).save();

    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.activateAccount = async(req, res) => {
    try{

    }catch(error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: 'The email address entered is not connected to an account'
            });
        }

    }catch(error) {
        res.status(500).json({ message: error.message });
    }
};