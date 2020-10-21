const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const commentSchema = new Schema({
    author:String,
    date:{type:Date, default:Date.now},
    content:String
});

module.exports = mongoose.model("Comment", commentSchema)