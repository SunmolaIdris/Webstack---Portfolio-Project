//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim, ante nec efficitur blandit, arcu dui eleifend sem, at fringilla ligula nisi ut mauris. Morbi eros erat, ornare non eleifend sit amet, semper nec sem. Maecenas tincidunt, erat eget porta pulvinar, mauris nisl elementum mi, vitae congue eros enim non nibh. Nulla venenatis tortor eu elit interdum, et lacinia ex faucibus. Morbi augue arcu, luctus ut ligula eu, pharetra suscipit mauris. Phasellus maximus rhoncus nisi, ac tempor nulla tempor non. Ut non dapibus nulla. Nullam ullamcorper turpis erat, ut faucibus sapien vehicula ut. Pellentesque viverra ultrices accumsan. Vestibulum id tortor mauris. Nullam ac purus luctus elit pretium accumsan. Morbi commodo eget lectus ut malesuada. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Integer porta imperdiet pulvinar. Praesent ac magna lobortis, viverra ex vitae, sagittis nisl. Aliquam tincidunt pharetra felis, sollicitudin vehicula tellus ultricies a. Integer egestas nulla orci, in dictum neque tincidunt at. Sed et ante nec diam laoreet volutpat vel ut velit. Proin ac risus nec mauris elementum vehicula venenatis sit amet ipsum. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Feel free to contact me via my email address: sunmolaidris@gmail.com.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
