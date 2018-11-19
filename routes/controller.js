const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");

router.get("/", (req, res) => {
    res.render("index", {page: 1});
});

router.get("/page", (req, res) => {
    let page = req.query.p || 1;
    if (page == 0){
        res.redirect("/400");
    } else {
        res.render("index", {page});
    }
});

router.get("/scrape", (req, res) => {
  
    request("https://news.ycombinator.com/", (error, response, html) => {
        let $ = cheerio.load(html);
        $(".storylink").each(function(i, element) {  
            let result = {};      
            result.title = $(this).text();
            result.link = $(this).attr("href");
            let entry = new Post(result);
            entry.save((err, doc) => {            
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(doc);
                }
            });
        });
        res.redirect("/");
    });
});

router.post("/comment/:id", (req, res) => {
    let newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    newComment.save(function (err, doc) {
        if (err) {
            res.send(err);
        } else {
            let id = req.params.id;
            Post.findOneAndUpdate({
                _id: id
            }, {
                $push: {
                    "comments": doc._id
                }
            }, {
                new: true
            }, function (err, newdoc) {
                if (err) {
                    res.send(err);
                }        
                else {
                    res.status(200).send(newdoc);
                }
            });
        }
    });
});

router.delete("/comment/:id", (req, res) => {
    Comment.findByIdAndRemove({
        _id: req.params.id
    }, (err, doc) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send(doc);
        }
    });
});

router.delete("/reset", (req, res) => {
    Post.remove({}, () => {
        Comment.remove({}, () => {
            res.status(200).end();
        });
    });
});

router.get("/posts", (req, res) => {
    let page = req.query.p || 1;
    if (page == 0){
        res.redirect("/400");
    } else {
        Post.paginate({}, {
            populate: "comments",
            page,
            limit: 10
        }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

router.get("/400", (req, res) => {
    res.status(400).send("Error 400: Bad request!");
});

router.get("*", (req, res) => {
    res.status(404).send("Error 404: Not found!");
});

module.exports = router;