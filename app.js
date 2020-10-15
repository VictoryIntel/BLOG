const express = require("express");
const app = express();


// Direct express to the public folder
app.use(express.static(__dirname + '/public'));


// set the view engine to ejs
app.set("view engine", "ejs");
var posts = [
    {title: "Widgets and You", author: "Kennedy Omondi", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
    {title: "How to Train Your Cat", author: "Salome Mberia", image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"},
    {title: "Don't Put That There", author: "Aisha Njenga", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
    {title: "Amateur Chainsaw Juggling", author: "Wycliff Mutobo", image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"},
    {title: "The Legend of the BeeGees", author: "Eusebius Likoko", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"}
]


// list all the posts on pets
app.get("/", (req, res)=>{
    res.render("pages/posts", {posts:posts, style:"app.css"})
});

// form for adding a new post
app.get("/posts/new", (req, res)=>{
    res.render("pages/new");
})
app.listen(3000, ()=>{
    console.log("Server running")
});