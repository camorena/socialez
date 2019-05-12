// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the comments
  app.get("/api/comments", function(req, res) {
    var query = {};
    if (req.query.post_id) {
      query.PostId = req.query.post_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Comment.findAll({
      where: query,
      include: [db.Post]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // Get route for retrieving a single comment
  app.get("/api/comments/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // POST route for saving a new comment
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // DELETE route for deleting comments
  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // PUT route for updating comments
  app.put("/api/comments", function(req, res) {
    db.Comment.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // PUT route for updating Comment's likes
  app.put("/api/comments/likes/:id", function(req, res) {
    console.log("Key ", req.params.id);
    db.Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
      return dbComment.increment("likes", { by: 1 });
    });
  });

  // PUT route for updating Comment's likes
  app.put("/api/comments/dislikes/:id", function(req, res) {
    console.log("Key ", req.params.id);
    db.Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
      return dbComment.increment("dislikes", { by: 1 });
    });
  });
};
