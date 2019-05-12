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
  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
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
    var queryOrder = ["views", "DESC"];

    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Post.findAll({
      attributes: queryAttr,
      where: query,
      order: queryOrder,
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
    db.Post.bulkCreate([
      {
        title: "The Most Important Question of Your Life",
        body:
          "Everybody wants what feels good. Everyone wants to live a carefree, happy and easy life, to fall in love and have amazing sex and relationships, to look perfect and make money and be popular and well-respected and admired and a total baller to the point that people part like the Red Sea when you walk into the room.Everyone would like that — it’s easy to like that.",
        imageUrl:
          "https://markmanson.net/wp-content/uploads/2017/01/tim-not-giving-a-fuck.png",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 10,
        laughs: 2,
        UserId: 1
      },
      {
        title: "Stop Trying to Be Happy",
        body:
          "Happiness, like other emotions, is not something you obtain, but rather something you inhabit. When you’re raging pissed and throwing a socket wrench at the neighbor’s kids, you are not self-conscious about your state of anger. You are not thinking to yourself, “Am I finally angry? Am I doing this right?” No, you’re out for blood. You inhabit and live the anger. You are the anger. And then it’s gone.Just as a confident man doesn’t wonder if he’s confident, a happy man does not wonder if he’s happy. He simply is.What this implies is that finding happiness is not achieved in itself, but rather it is the side effect of a particular set of ongoing life experiences. This gets mixed up a lot, especially since happiness is marketed so much these days as a goal in and of itself. Buy X and be happy. Learn Y and be happy. But you can’t buy happiness and you can’t achieve happiness. It just is—once you get other parts of your life in order.",
        imageUrl:
          "https://markmanson.net/wp-content/uploads/2018/02/key-to-finding-happiness-scarface-cocaine.jpg",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 20,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 30,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 150,
        laughs: 2,
        UserId: 1
      },
      {
        title: "Gray bridge and trees",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/1558732/pexels-photo-1558732.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 5,
        laughs: 2,
        UserId: 2
      },
      {
        title: "Red and black bird",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 9,
        laughs: 2,
        UserId: 2
      },
      {
        title: "Black metal frame ligth",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 2,
        laughs: 2,
        UserId: 2
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/40896/larch-conifer-cone-branch-tree-40896.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 100,
        laughs: 2,
        UserId: 3
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/39629/tiger-tiger-baby-tigerfamile-young-39629.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 4322,
        laughs: 2,
        UserId: 3
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 987,
        laughs: 2,
        UserId: 3
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259660.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 222,
        laughs: 2,
        UserId: 4
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259650.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 101,
        laughs: 2,
        UserId: 4
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 203,
        laughs: 2,
        UserId: 4
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 2,
        laughs: 2,
        UserId: 2
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259653.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 18,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259654.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 12,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259655.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 40,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259656.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 6,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259657.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 15,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259658.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 34,
        laughs: 2,
        UserId: 1
      },
      {
        title: "",
        body: "",
        imageUrl:
          "https://images.pexels.com/photos/259660/pexels-photo-259662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 3,
        dislikes: 1,
        loves: 1,
        views: 76,
        laughs: 2,
        UserId: 1
      }
    ]).then(dbPost => {
      res.json(dbPost);
    });
  });
};
