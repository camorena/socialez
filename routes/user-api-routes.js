var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put("/api/signup", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        userid: req.body.userid,
        psw: req.body.psw
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put("/api/users/seed", function(req, res) {
    db.User.bulkCreate([
      {
        name: "Carlos Moreno",
        avatarUrl:
          "https://listimg.pinclipart.com/picdir/s/3-39434_mazeo-avatar-medium-600pixel-clipart-vector-clip-art.png",
        userid: "camoren",
        psw: "carlos"
      },
      {
        name: "Freddy ",
        avatarUrl:
          "https://cdn.kastatic.org/images/avatars/svg/aqualine-sapling.svg",
        userid: "freddy",
        psw: "freddy"
      },
      {
        name: "Tyler",
        avatarUrl:
          "https://cdn.kastatic.org/images/avatars/svg/aqualine-ultimate.svg",
        userid: "tyler",
        psw: "tyler"
      },
      {
        name: "Ahmed",
        avatarUrl:
          "https://cdn.dribbble.com/users/364897/screenshots/2912898/personal-avatar.gif",
        userid: "ahmed",
        psw: "ahmed"
      }
    ]).then(dbUser => {
      res.json(dbUser);
    });
  });
};
