const express = require("express");
const app = express();
var methodOverride = require('method-override')

const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
app.use(methodOverride('_method'))


app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [{
    id : uuidv4(), 
    username : "siddhant mishra",
    content : "Be the change that you wish to see in the world. ",
},
{
    id : uuidv4(), 
    username : "Atan Bhardwaj",
    content : "So many books, so little time.",
},
{   id : uuidv4(),
    username : "kashyap singh",
    content : "Be yourself; everyone else is already taken.",
},
{   id : uuidv4(),
    username : "saurabh yadav",
    content : "A room without books is like a body without a soul.",
}];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
   let { id } = req.params;
   console.log(req.params);
   let post = posts.find((p) => id === p.id);
   res.render("show.ejs", { post });

});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
 });
 
 app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
 });
 app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
 });


app.listen(port, () => {
console.log(`app is listening on ${port}`);
});