const User = require("../models/User");

exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match()
};

exports.validatelength = (text, min, max) => {

}

exports.validateUsername = async(username) => {
    let a = false;

    do{

    } while(a);

    return username;
}