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

  // index route loads post.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // get route view post.html
  app.get("/story", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/story.html"));
  });

  // get route view post.html
  app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view_story.html"));
  });

  // get route view user stories.html
  app.get("/stories", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stories.html"));
  });

  // get route view user stories.html
  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
};
