var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index");
    });
  });

  // NOT SURE IF WE NEED THIS. didn't want to delete
  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Load Second Page
  // Added by JT. This will launch the second.handlebars page
  app.get("/second", function (req, res) {
    res.render("second", {
      user_name: "Susan"
    });
  });

  // Load survey page
  // Added by KB. This will launch the Survey Handlebars page
  app.get("/survey", function (req, res) {
    res.render("surveyUsingSurveyJS");
    // res.render("datatest", {
    //   msg: "Data Test Page!",
    //   examples: dbExamples
    // });

  });

  // KB Sequelize Testing
  app.get("/api/:table", function (req, res) {
    
    console.log(`htmlRoutes.js: req.params.table = ${req.params.table}`);
    switch (req.params.table) {
      case "users":
        db.User.findAll({}).then(function (data) {
          res.json(data);
        });
        break;

      case "restaurants":
        db.Restaurant.findAll({}).then(function (data) {
          res.json(data);
        });
        break;

      case "posts":
        db.Post.findAll({}).then(function (data) {
          res.json(data);
        });
        break;

      default:
        res.json({ status: "404" });
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
