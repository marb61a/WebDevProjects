const cloudinary = require("cloudinary");
const fs = require("fs");
const path = require("path");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.uploadImages = async(req, res) => {
    try{
        const path = req.body;
        let files = Object.values(req.files).flat();
        let images = [];
        for(const file of files){
            const url = await uploadToCloudinary(file, path);
            images.push(url);
            removeTmp(file.tempFilePath);
        }

        res.json(images);
    } catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};
