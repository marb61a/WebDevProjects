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

exports.findUser = async(req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email }).select("-password");
        if(!user){
            return res.status(400).json({
                message: "Account does not exist"
            });
        }

        return res.status(200).json({
            email: user.email,
            picture: user.picture
        });
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.sendResetPasswordCode = async(req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email }).select("-password");
        await code.findOneAndRemove({ user: user._id });
        const code = generateCode(5);
        const savedCode = await new Code({
            code,
            user: user._id,
        }).save();
        sendResetCode(user.email, user.first_name, code);

        return res.status(200).json({
            message: "Reset code has been sent to your email address"
        });
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.validateResetCode = async(req, res) => {
    try{
        const { email, code } = req.body;
        const user = await User.findOne({ email });
        const DbCode = await User.findOne({ user: user._id });
        if(DbCode.code !== code){
            return res.status(400).json({
                message: "Verification code is incorrect"
            });
        }

        return res.status(200).json({
            message: "Ok"
        });
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.changePassword = async(req, res) => {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
        { email },
        {
            password: cryptedPassword,
        }
    );
    return res.status(200).json({ message: "ok" });
};

exports.getProfile = async(req, res) => {
    try{
        const { username } = req.params;
        const user = await User.findById(req.user.id);
        const profile = await User.findOne({ username }).select("-password");
        const friendship = {
            friends: false,
            following: false,
            requestSent: false,
            requestReceived: false
        };

        if(!profile){
            return res.json({ ok: false });
        }
        if(user.friends.includes(profile._id) && profile.friends.includes(user._id)){
            friendship.friends = true;
        }
        if (user.following.includes(profile._id)) {
            friendship.following = true;
        }
        if (user.requests.includes(profile._id)) {
            friendship.requestReceived = true;
        }
        if (profile.requests.includes(user._id)) {
            friendship.requestSent = true;
        }
      
        const posts = await Post.find({ user: profile._id })
            .populate("user")
            .populate(
                "comments.commentBy",
                "first_name last_name picture username commentAt"
            )
            .sort({ createdAt: -1 });
        await profile.populate("friends", "first_name last_name username picture");
        res.json({ ...profile.toObject(), posts, friendship });
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.updateProfilePicture = async (req, res) => {
    try {
        const { url } = req.body;  
        await User.findByIdAndUpdate(req.user.id, {
            picture: url
        });
        res.json(url);
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};
  
exports.updateCover = async (req, res) => {
    try {
        const { url } = req.body;
        await User.findByIdAndUpdate(req.user.id, {
            cover: url
        });
        res.json(url);
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.updateDetails = async(req, res) => {
    try{
        const { infos } = req.body;
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            {
                details: infos
            },
            {
                new: true
            }
        );
        res.json(updated.details);
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.addFriend = async(req, res) => {
    try{
        if(req.user.id !== req.params.id){
            const sender = await User.findById(req.user.id);
            const receiver = await User.findById(req.params.id);

            if(!receiver.requests.includes(sender._id) && !receiver.friends.includes(sender._id)){
                await receiver.updateOne({
                    $push: { requests: sender._id },
                  });
                await receiver.updateOne({
                    $push: { followers: sender._id },
                });
                await sender.updateOne({
                    $push: { following: receiver._id },
                });
                  
                res.json({ message: "friend request has been sent" });
            } else {
                return res.status(400).json({
                    message: "Already Sent"
                });
            }
        } else {
            return res.status(400).json({
                message: "You can't send a request to yourself"
            });
        }
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.cancelRequest = async (req, res) => {
    try{
        if(req.user.id !== req.params.id){
            const sender = await User.findById(req.user.id);
            const receiver = await User.findById(req.params.id);

            if(receiver.requests.includes(sender._id) && !receiver.friends.includes(sender._id)){
                await receiver.updateOne({
                    $pull: { requests: sender._id },
                  });
                await receiver.updateOne({
                    $pull: { followers: sender._id },
                });
                await sender.updateOne({
                    $pull: { following: sender._id },
                });
                  
                res.json({ message: "You have successfully cancelled your request" });
            } else {
                return res.status(400).json({
                    message: "Already Cancelled"
                });
            }
        } else {
            return res.status(400).json({
                message: "You can't cancel a request to yourself"
            });
        }
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.follow = async (req, res) => {
    try{
        if(req.user.id !== req.params.id){
            const sender = await User.findById(req.user.id);
            const receiver = await User.findById(req.params.id);

            if(!receiver.followers.includes(sender._id) && !receiver.following.includes(sender._id)){
                await receiver.updateOne({
                    $push: { requests: sender._id },
                  });
                await receiver.updateOne({
                    $push: { followers: receiver._id },
                });
                  
                res.json({ message: "Successfully Followed" });
            } else {
                return res.status(400).json({
                    message: "Already Following"
                });
            }
        } else {
            return res.status(400).json({
                message: "You can't cancel a request to yourself"
            });
        }
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.unfollow = async (req, res) => {
    try{
        if (req.user.id !== req.params.id) {
            const sender = await User.findById(req.user.id);
            const receiver = await User.findById(req.params.id);
            if (receiver.followers.includes(sender._id) && sender.following.includes(receiver._id)){
                await receiver.updateOne({
                    $pull: { followers: sender._id },
                });
                await sender.updateOne({
                    $pull: { following: receiver._id },
                });

                res.json({ message: "Unfollow Success" });
            } else {
                return res.status(400).json({ 
                    message: "Already not following" 
                });
            }
        } else {
            return res.status(400).json({ 
                message: "You can't unfollow yourself" 
            });
        }
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.acceptRequest = async(req, res) => {
    try{

    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};
