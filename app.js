const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://victory1:optiplex@cluster0.1ayns.mongodb.net/My_blog?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// use body-parser
app.use(bodyParser.urlencoded({extended:true}));


// Direct express to the public folder
app.use(express.static(__dirname + '/public'));


// set the view engine to ejs
app.set("view engine", "ejs");
// let posts = [
//     {title: "Widgets and You", author: "Kennedy Omondi", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
//     {title: "How to Train Your Cat", author: "Salome Mberia", image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"},
//     {title: "Don't Put That There", author: "Aisha Njenga", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
//     {title: "Amateur Chainsaw Juggling", author: "Wycliff Mutobo", image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"},
//     {title: "The Legend of the BeeGees", author: "Eusebius Likoko", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"}
// ]

// Post.create({title: "Widgets and You", author: "Kennedy Omondi", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
// (err, post)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Post successfully saved to database");
//         console.log(post)
//     }

// })
// list all the posts on pets
app.get("/posts", (req, res)=>{
    Post.find({}, (err, posts)=>{
        if(err){
            console.log(err)
        }else{
            res.render("pages/posts", {posts:posts, style:"app.css"})
        }
    })
});

// form for adding a new post
app.get("/posts/new", (req, res)=>{
    res.render("pages/new");
})
// create a new post
app.post("/posts", (req, res)=>{
    const post = req.body.post;
    Post.create(post,(err, newPost)=>{
        if(err){
            console.log(err)
        } else{
            console.log(newPost)
            res.redirect("/posts")
        }
    })  
})

// single blog post page
app.get("/posts/:id", (req, res)=>{
    let id = req.params.id;
    Post.findById(id,(err, dbData)=>{
        if(err){
            console.log(err)
        } else{
            console.log(dbData);
            res.render("pages/singlePost", {post:dbData})
        }
    })
})
app.listen(3000, ()=>{
    console.log("Server running")
});