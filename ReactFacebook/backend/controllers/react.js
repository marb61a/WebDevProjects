const mongoose = require("mongoose");

const React = require("../models/React");
const User = require("../models/User");

exports.reactPost = async(req, res) => {
    try{
        const { postId, react } = req.body;
        const check = await React.findOne({
            postRef: postId, 
            reactBy: mongoose.Types.ObjectId(req.user.id)
        });

        if(check == null){
            const newReact = new React({
                react: react,
                postRef: postId,
                reactBy: req.user.id
            });
            await newReact.save();
        } else {
            if(check.react == react) {
                await React.findByIdAndRemove(check._id);
            } else {
                await React.findByIdAndUpdate(check._id, {
                  react: react,
                });
            }
        }
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getReacts = async(req, res) => {
    try{
        const reactsArray = await React.find({ postRef: req.params.id });
        const newReacts = reactsArray.reduce((group, react) => {
            let key = react["react"];
            group[key] = group[key] || [];
            group[key].push(react);
            return group;
        }, {});

        const reacts = [
            {
                react: "like",
                count: newReacts.like ? newReacts.like.length : 0
            },
            {
                react: "love",
                count: newReacts.love ? newReacts.love.length : 0
            },
            {
                
            }
        ]
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};
