const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

const User = require("../models/User");
const Post = require("../models/Post");
const Code = require("../models/Code");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const {
    validateEmail,
    validateLength,
    validateUsername,
} = require("../helpers/validation");
const generateCode = require("../helpers/generateCode");

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

        const emailVerificiationToken = generateToken(
            {id: user._id.toString()},
            "30m"
        );
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        sendVerificationEmail(user.email, user.first_name, url);
        const token = generateToken({ id: user._id.toString() }, "7d");
        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register Success ! please activate your email to start"
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.activateAccount = async(req, res) => {
    try{
        const { token } = req.body;
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        const check = await User.findById(user.id);

        if(check.verified == true){
            return res
                .status(400)
                .json({ message: "This email is aleady verified "});
        } else {
            await User.findByIdAndUpdate(user.id, { verified: true });
            return res
                .status(200)
                .json({ message: "Account has beeen activated successfully." });
        }
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

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(400).json({
                message: "Invalid credentials.Please try again.",
            });
        }

        const token = generateToken({ id: user._id.toString() }, "7d");
        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register Success ! please activate your email to start",
        });

    }catch(error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendVerification = async(req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(user.verified === true){
            return res.status(400).json({
                message: "This account is already activated.",
            });
        }

        const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            "30m"
        );
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        sendVerificationEmail(user.email, user.first_name, url);
        return res.status(200).json({
            message: "Email verification link has been sent to your email.",
        });
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};