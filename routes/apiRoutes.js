var db = require("../models");
var axios = require("axios");


module.exports = function (app) {
  // Get restaurants
  app.post("/api/restaurants", function (req, res) {
    console.log(`/api/restaurants: req.body = ${JSON.stringify(req.body)}`);
    console.log(`/api/restaurants: req.body.loc = ${req.body.loc}`);
    console.log(`/api/restaurants: req.body.scores = ${req.body.scores}`);

    var search = req.body.loc;
    var url = "https://nominatim.openstreetmap.org/?format=json&limit=1&addressdetails=1&countrycodes=US&q=";
    var queryTerm = '';
    for (let i = 0; i < search.length; i++) {
      if (search[i] === ' ') {
        queryTerm += '+';
      } else {
        queryTerm += search[i].toLowerCase();
      }
    }

    // Call the Open Street Maps API for location then call the TripAdvisor API passing in the
    // lat/lon from the Open Street Maps results

    // Open Street Maps call
    axios.get(url + queryTerm).then(function (response) {
      // console.log(`OSM: axios response = ${JSON.stringify(response.data, null, 3)}`);
      var lat = response.data[0].lat;
      var lon = response.data[0].lon;

      // Trip Advisor call
      const options = {
        headers: {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": process.env.TRIP_KEY
        }
      };
      var url = "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=5&currency=USD&distance=25&lunit=km&combined_food=" + req.body.scores + "&lang=en_US&latitude=" + lat + "&longitude=" + lon;
      console.log(`TripAdvisor url = ${url}`);
      axios.get(url, options).then(function (response) {
        // console.log(`TA: axios response = ${JSON.stringify(response.data, null, 3)}`);
        if (response.data === null) {
          res.json(404, "No Data Found");
        } else {
          res.json(response.data);
        }
      }).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

    // TODO: logic for calculating restaurant to return goes here
    // calculateTopFive(req.body.search);
  });

  // KB Sequelize Testing
  // app.get("/api/tables/:table", function (req, res) {
  //   console.log(`apiRoutes.js: req.params.table = ${req.params.table}`);
  //   switch (req.params.table) {
  //     // This case was just for loading initial test entries into the db tables
  //     case "t":
  //     db.User.create({"name": "Kevin","cell": "1234567890"}).then(function (data) {
  //       res.json(data);
  //     });
  //     db.Restaurant.create({"restaurantName": "Rusty Pelican","restaurantAddr": "123 Some Blvd, Brea, CA","restaurantPhone":"1111112345"}).then(function (data) {
  //       res.json(data);
  //     });
  //     db.Post.create({"rating": "5","notes": "Very good seafood!","UserId":"1","RestaurantId":"1"}).then(function (data) {
  //       res.json(data);
  //     });
  //     break;

  //     case "users":
  //       db.User.findAll({}).then(function (data) {
  //         res.json(data);
  //       });
  //       break;

  //     case "restaurants":
  //       db.Restaurant.findAll({}).then(function (data) {
  //         res.json(data);
  //       });
  //       break;

  //     case "posts":
  //       db.Post.findAll({}).then(function (data) {
  //         res.json(data);
  //       });
  //       break;

  //     default:
  //       res.json({ status: "404" });
  //   }
  // });

  // added by jodi
  // created SavedRestaurants table and populating with saved restaurantName 
  app.post("/api/save-restaurant/:id", function (req, res) {
    db.SavedRestaurants.create({
      name: req.body.restaurantName,
      restaurantAddr: req.body.restaurantAddr,
      restaurantPhone: req.body.restaurantPhone,
      UserId: req.body.id
    }).then(function () {
      res.json("/second");
    });
  });

  

  app.get("/api/validateloc/:location", function (req, res) {
    console.log(`/api/validateloc: req.params.location = ${req.params.location}`);

    var search = req.params.location;
    var url = "https://nominatim.openstreetmap.org/?format=json&limit=1&addressdetails=1&countrycodes=US&q=";
    var queryTerm = '';
    for (let i = 0; i < search.length; i++) {
      if (search[i] === ' ') {
        queryTerm += '+';
      } else {
        queryTerm += search[i].toLowerCase();
      }
    }
    axios.get(url + queryTerm).then(function (response) {
      console.log(`OSM: axios response = ${JSON.stringify(response.data, null, 3)}`);
      if (response.data.length > 0) {
        var lat = response.data[0].lat;
        var lon = response.data[0].lon;
        console.log(`validateZip(): got OSM data`);
        res.json(true);
      } else {
        console.log(`validateZip(): No data returned from OSM!`);
        res.json(false);
      }
    });
    
  });

  

  // Get user
  app.post("/api/user", function (req, res) {
    console.log(`/api/user: req.body = ${JSON.stringify(req.body)}`);
    db.User.findOrCreate({
      where: {
        name: req.body.name,
        cell: req.body.cell
      },
      include: [db.SavedRestaurants]
    }).then(function (userData) {
      if (userData) {
        console.log(`userData = ${JSON.stringify(userData)}`);
        res.json(userData);
      } else {
        res.json(500, "Server error; no data");
      }
    });
  });

  
  
};


