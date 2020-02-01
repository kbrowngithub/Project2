var db = require("../models");
var axios = require("axios");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // db.Example.findAll({}).then(function (dbExamples) {
    res.render("index");
    // });
  });

  // Create a new example
  app.get("/testdata/:name/:addr/:phone/:id", function (req, res) {
    console.log(`/api/testdata/:name/:addr/:phone = ${JSON.stringify(req.params)}`);
    db.SavedRestaurants.create({
      name: req.params.name,
      restaurantAddr: req.params.addr,
      restaurantPhone: req.params.phone,
      UserId: req.params.id
    }).then(function (result) {
      res.json(result);
    });
  });

  app.get("/second/:cell", function (req, res) {
    console.log(`In app.get(/second/:cell), req.params.cell = ${JSON.stringify(req.params.cell)}`);
    db.User.findOrCreate({
      where: {
        cell: req.params.cell
      },
      include: [db.SavedRestaurants]
    }).then(function (userData) {
      console.log(`userData = ${JSON.stringify(userData)}`);
      var restaurant = [];
      var r = userData[0].SavedRestaurants;
      var uData = {};

      if (r.length === 0) {
        uData = {
          name: userData[0].name
        };
      } else {
        for (var i = 0; i < r.length; i++) {
          console.log(`restaurant name = ${JSON.stringify(userData[0].SavedRestaurants[i].name)}`);
          restaurant.push({ name: userData[0].SavedRestaurants[i].name });
          console.log(`restaurant[${i}] = ${restaurant[i].name}`);
        }
        uData = {
          name: userData[0].name,
          restaurant: restaurant
        };
      }
      console.log(`render second page with uData =  ${JSON.stringify(uData)}`);
      res.render("second", uData);
    });
  });

  app.get("/backtostart/:id", function (req, res) {
    console.log(`In app.get(/backtostart), req.body = ${JSON.stringify(req.body)}`);
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.SavedRestaurants]
    }).then(function (userData) {
      console.log(`userData = ${JSON.stringify(userData)}`);
      var restaurant = [];
      var r = userData.SavedRestaurants;
      var uData = {};

      if (r.length === 0) {
        uData = {
          name: userData.name
        };
      } else {
        for (var i = 0; i < r.length; i++) {
          console.log(`restaurant name = ${JSON.stringify(userData.SavedRestaurants[i].name)}`);
          restaurant.push({ name: userData.SavedRestaurants[i].name });
          console.log(`restaurant[${i}] = ${restaurant[i].name}`);
        }
        uData = {
          name: userData.name,
          restaurant: restaurant
        };
      }
      console.log(`render second page with uData =  ${JSON.stringify(uData)}`);
      res.render("second", uData);
    });
  });

  // Takes in top 5 restaurants and passes to recommendation modal
  // app.get("/topfive", function (req, res) {
  //   console.log(`In app.get(/topfive), req.body = ${JSON.stringify(req.body)}`);
  //   res.render("results-modal", req.body);
  // });

  // For Testing
  app.get("/testdata/:name/:addr/:phone/:id", function (req, res) {
    console.log(`/api/testdata/:name/:addr/:phone = ${JSON.stringify(req.params)}`);
    db.SavedRestaurants.create({
      name: req.params.name,
      restaurantAddr: req.params.addr,
      restaurantPhone: req.params.phone,
      UserId: req.params.id
    }).then(function (result) {
      res.json(result);
    });
  });

  // Load survey page
  // Added by KB. This will launch the Survey Handlebars page
  app.get("/survey", function (req, res) {
    res.render("surveyUsingSurveyJS");
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