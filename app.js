const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
const methodOverride = require("method-override");
const seedDB = require("./seeds");
//Set up mongoose connection
const mongoose = require('mongoose');
// const mongoDB = 'mongodb://127.0.0.1/My_blog';
const mongoDB = 'mongodb+srv://victory1:optiplex@cluster0.1ayns.mongodb.net/My_blog?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// use body-parser
app.use(bodyParser.urlencoded({extended:true}));

//use method override
app.use(methodOverride("_method"))

// Direct express to the public folder
app.use(express.static(__dirname + '/public'));


// set the view engine to ejs
app.set("view engine", "ejs");


// run seed database function.

seedDB();
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
    Post.findById(id).
    populate("comments").
    exec((err, dbData)=>{
        if(err){
            console.log(err)
        } else{
            console.log(dbData);
            res.render("pages/singlePost", {post:dbData})
        }
    })
})
//setting ejs
app.get("/settings/posts", function (req, res) {
    // get blogs from database
    Post.find({}, function (err, posts) {
      if (err) {
        console.log("Error: Unable to retreive blog data.")
      } else {
        res.render("pages/settings-posts", {posts: posts})
      }
    })
  })

  //update ejs
app.get("/settings/posts/:id/edit",(req, res)=>{
    let id = req.params.id;
    Post.findById(id, (err, post)=>{
        if(err){
            console.log(err)
        } else{
            res.render("pages/edit", {post:post});
        }
    })
}); 

//updating a post
app.put("/settings/posts/:id", (req, res)=>{
    let id = req.params.id;
    let update = req.body.post
    Post.findByIdAndUpdate(id, update, (err, updatedPost)=>{
        if(err){
            console.log(err);
        }else{
            console.log(updatedPost)
            res.redirect("/posts/" + req.params.id);
        }
    })
})

// deleting a blog
app.delete("/posts/:id", (req, res)=>{
    let id = req.params.id;
    Post.findByIdAndRemove(id, (err)=>{
        if(err){
            console.log("failed to delete");
        }else{
            res.redirect("/settings/posts");
        }
    })
})
app.listen(3000, ()=>{
    console.log("Server running")
});