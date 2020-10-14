const express = require("express");
const app = express();


// Direct express to the public folder
app.use(express.static("public"));
// set the view engine to ejs
app.set("view engine", "ejs");
// list all the posts on pets
app.get("/", (req, res)=>{
    res.render("pages/posts")
});

app.listen(3000, ()=>{
    console.log("Server running")
});