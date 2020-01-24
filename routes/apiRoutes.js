var db = require("../models");

module.exports = function (app) {
  // Get restaurants
  app.post("/api/restaurants", function (req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
    console.log(`/api/restaurants: req.body = ${JSON.stringify(req.body)}`);

    // TODO: logic for calculating restaurant to return goes here

    // Just for testing
    var tmpData = {
      "name": "R-Name",
      "address": "1111 SomeStreet, city, ST",
      "phone": "111-111-1111"
    };

    res.json(tmpData);
  });

  // KB Sequelize Testing
  app.get("/api/:table", function (req, res) {
    console.log(`apiRoutes.js: req.params.table = ${req.params.table}`);
    switch (req.params.table) {
      // This case was just for loading initial test entries into the db tables
      // case "t":
        // db.User.create({"name": "Kevin","cell": "1234567890"}).then(function (data) {
        //   res.json(data);
        // });
        // db.Restaurant.create({"restaurantName": "Rusty Pelican","restaurantAddr": "123 Some Blvd, Brea, CA","restaurantPhone":"1111112345"}).then(function (data) {
        //   res.json(data);
        // });
        // db.Post.create({"rating": "5","notes": "Very good seafood!","UserId":"1","RestaurantId":"1"}).then(function (data) {
        //   res.json(data);
        // });
        // break;

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


  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
