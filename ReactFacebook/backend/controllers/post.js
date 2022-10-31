const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async(req, res) => {
    try{
        const post = await new Post(req.body).save();
        await post.populate("user", "first_name last_name cover picture username");
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllPosts = async(req, res) => {
    try{
        const followingTemp = await User.findById(req.user.id).select("following");
        const following = followingTemp.following;

        const promises = following.map((user) => {

        });
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}