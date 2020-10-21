const mongoose = require("mongoose");

//Define schema

let Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:String,
    author: String,
    image:String,
    date:{type:Date, default:Date.now},
    subject:{type:String, default:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eaque, debitis sit quae odio sed aliquid sapiente exercitationem non iste sunt repellendus amet eius alias laudantium atque similique accusantium vel. Totam ea quam vel ad eos expedita, explicabo minus esse sunt?"},
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
    
});

//compile model from schema and export
module.exports= mongoose.model("Post", PostSchema);
