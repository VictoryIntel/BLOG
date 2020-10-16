const mongoose = require("mongoose");

//Define schema

let Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:String,
    author: String,
    image:String
    
});

//compile model from schema and export
module.exports= mongoose.model("Post", PostSchema);
