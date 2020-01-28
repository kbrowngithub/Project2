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
  // this will launch the second.handlebars page
  app.get("/second/:name", function (req, res) {
    console.log(`In app.get(/second), req.params.name = ${JSON.stringify(req.params.name)}`);
    res.render("second", {
      name: req.params.name
      });
  });

  app.get("/second", function (req, res) {
    console.log(`In app.get(/second), req.params.name = ${JSON.stringify(req.params.name)}`);
    res.render("second");
  });

  // Load survey page
  // Added by KB. This will launch the Survey Handlebars page
  // app.get("/survey/:location", function (req, res) {
  app.get("/survey/:location", function (req, res) {
    console.log(`/survey/:location: req.params.location = ${req.params.location}`);
    // res.render("surveyUsingSurveyJS");
    res.render("surveyUsingSurveyJS", {
      location: req.params.location
    });
  });

  // KB Sequelize Testing
  app.get("/api/tables/:table", function (req, res) {
    
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
