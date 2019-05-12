// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // cms comments route loads cmscom.html
  app.get("/cmscom", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cmscom.html"));
  });

  // post route loads post.html
  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });
  // authors route loads author-manager.html
  app.get("/comments", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/comment-manager.html"));
  });
};