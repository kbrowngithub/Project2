var db = require("../models");

module.exports = function(app) {
  // Get restaurants
  app.post("/api/restaurants", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
    console.log(`/api/restaurants: req.body = ${JSON.stringify(req.body)}`);

    // TODO: logic for calculating restaurant to return goes here

    // Just for testing
    var tmpData = {"name": "R-Name", 
                  "address": "1111 SomeStreet, city, ST",  
                  "phone": "111-111-1111"};

    res.json(tmpData);
  });

  // KB Sequelize Testing
  app.get("/api/:table", function(req, res) {
    db.User.findAll({}).then(function(data) {
      res.json(data);
    });
  });


  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
