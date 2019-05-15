// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var postSeed = require("../data/posts.json");

console.log("database object model ", db);

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/posts/:item", function(req, res) {
    var item = req.params.item;
    var queryLimit = 6;
    var queryOrder = [[item, "DESC"]];
    console.log("QUERY ORDER ", queryOrder);
    var queryAttr = [
      "title",
      "body",
      "imageUrl",
      "likes",
      "dislikes",
      "loves",
      "views",
      "laughs"
    ];
    db.Post.findAll({
      attributes: queryAttr,
      order: queryOrder,
      limit: queryLimit,
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts/image", function(req, res) {
    var body = req.body;
    fs.readFile(req.files.displayImage.path, function(err, data) {
      var newPath = __dirname + "../public/uploads/post_" + req.params.id;
      body.imageUrl = newPath;
      console.log("New body", body);
      fs.writeFile(newPath, data, function(err) {
        db.Post.create(body).then(function(dbPost) {
          res.json(dbPost);
        });
      });
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating Post's likes
  app.put("/api/posts/likes/:id", function(req, res) {
    console.log("Key ", req.params.id);
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
      return dbPost.increment("likes", { by: 1 });
    });
  });

  // PUT route for updating Post's likes
  app.put("/api/posts/dislikes/:id", function(req, res) {
    console.log("Key ", req.params.id);
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
      return dbPost.increment("dislikes", { by: 1 });
    });
  });
  // PUT route for updating Post's likes
  app.put("/api/posts/loves/:id", function(req, res) {
    console.log("Key ", req.params.id);
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
      return dbPost.increment("loves", { by: 1 });
    });
  });
  // PUT route for updating Post's likes
  app.put("/api/posts/laughs/:id", function(req, res) {
    console.log("Key ", req.params.id);
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
      return dbPost.increment("laughs", { by: 1 });
    });
  });

  app.put("/api/posts/seed", function(req, res) {
    db.Post.bulkCreate(postSeed).then(dbPost => {
      res.json(dbPost);
    });
  });
};
