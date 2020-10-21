const Post = require("./models/post");
const Comment = require("./models/comments");
const post = require("./models/post");

let data = [
    {date:2020-03-20, title: "Widgets and You", author: "Kennedy Omondi", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
    {date:2020-03-21, title: "How to Train Your Cat", author: "Salome Mberia", image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"},
    {date:2020-03-25, title: "Don't Put That There", author: "Aisha Njenga", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
    {date:2020-03-26, title: "Amateur Chainsaw Juggling", author: "Wycliff Mutobo", image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"},
    {date:2020-03-30, title: "The Legend of the BeeGees", author: "Eusebius Likoko", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"}
]

const commentSeeds = [
    {
        author: "Duke Ellington",
        content: "This comment will be the same for every blog. But it's just seed data so who cares."
    },{
        author: "Marv Ellis",
        content: "Would you be interested in hosting a guest post about article xyz?"
    },{
        author: "Ella Fitzgerald",
        content: "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong."
    }
];

async function seedDB(){
    try{
        await Post.deleteMany({});
        await Comment.deleteMany({});
        console.log("POSTS AND COMMENTS DELETED")
        // add seed data
        for(const seed of data){
            let post = await Post.create(seed);
            for(const commentSeed of commentSeeds){
                let comment = await Comment.create(commentSeed);
                post.comments.push(comment);
                
            }
            post.save()
            console.log("BLOG SAVED")
        }
    } catch(err){
        console.log(err)
    }
    
}
//export as a module
module.exports = seedDB;