// Get references to page elements
var $name = $("#name");
var $cell = $("#number");
var $location = $("#location");

var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  // This function added by KB
  // getMapData: function (search) {
  //   console.log(`getMapData(): search = ${search}`);
  //   var url = "https://nominatim.openstreetmap.org/?format=json&limit=1&addressdetails=1&countrycodes=US&q="
  //   // var url = "https://nominatim.openstreetmap.org/?format=json&limit=1&addressdetails=1&countrycodes=US&q=Denver,CO"
  //   var queryTerm = '';
  //   for (let i = 0; i < search.length; i++) {
  //     if (search[i] === ' ') {
  //       queryTerm += '+';
  //     } else {
  //       queryTerm += search[i].toLowerCase();
  //     }
  //   }

  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "GET",
  //     url: url + queryTerm,
  //     success: function (response) {
  //       console.log(JSON.stringify(response[0], null, 2));
  //       // TODO: Do we need to test for city value here???
  //       // if (response[0].address.city) {
  //       //     console.log(JSON.stringify(response));
  //       //     var city = response[0].address.city;
  //       //     //var postcode = response[0].address.postcode;
  //       //     var state = response[0].address.state;
  //       //     var lat = response[0].lat;
  //       //     var lon = response[0].lon;
  //       // } else {
  //       //     console.log(response);
  //       //     console.log('Incorrect search');
  //       // }

  //       // TODO: Do we need a DB push here???
  //     },
  //     error: function (xhr, ajaxOptions, thrownError) {
  //       console.log(xhr.status);
  //       console.log(thrownError);
  //     }
  //   });
  // },
  // //NATHANIEL's API STUFF
  // getTripAdvisor: function (city, paramsArr) {
  //   console.log(`getTripAdvisor: location = ${city}`);
  //   return new Promise(function (resolve, reject) {
  //     function citySettings(city) {
  //       return {
  //         "async": true,
  //         "crossDomain": true,
  //         "url": "https://tripadvisor1.p.rapidapi.com/locations/search?limit=1&sort=relevance&offset=0&lang=en_US&currency=USD&units=mi&query=" + city,
  //         "method": "GET",
  //         "headers": {
  //           "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
  //           "x-rapidapi-key": "2c641ac47amshde4fb7d34f243e5p1ea1dajsn860dafbf04af"
  //         }
  //       }
  //     }
  //     function restaurantSettings(lat, lon) {
  //       return {
  //         "async": true,
  //         "crossDomain": true,
  //         "url": "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&combined_food=" +paramsArr.join("%252C")+ "&lang=en_US&latitude=" + lat + "&longitude=" + lon,
  //         "method": "GET",
  //         "headers": {
  //           "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
  //           "x-rapidapi-key": "2c641ac47amshde4fb7d34f243e5p1ea1dajsn860dafbf04af"
  //         }
  //       }
  //     }

  //     $.get(citySettings(city))
  //       .then(function ({ data }) {
  //         const { latitude, longitude } = data[0].result_object;
  //         return $.get(restaurantSettings(latitude, longitude))
  //       })
  //       .then(function ({ data }) {
  //         resolve(data);
  //       })
  //       .catch(function (error) {
  //         reject(error)
  //       });
  //   })
  // },

  getUser: function (user) {
    console.log(`getUser(): user = ${JSON.stringify(user)}`);
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/user",
      type: "POST",
      data: JSON.stringify(user)
    });
  },
  showUser: function (name) {
    console.log(`In showUser() name = ${name}`);
    return $.ajax({
      url: "/second/" + name,
      type: "GET"
    });
  },
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// Added by KB: not sure if we'll need this later
// Displays the JSON returned from Open Street Maps API
var showMapData = function (data) {
  var $examples = JSON.stringify(data);
  $exampleList.empty();
  $exampleList.append($examples);
}

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        // .text(example.text)
        .text(`${example.text}: ${example.description}`)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handle form submit user info with onclick and redirects to second page
var handleFormSubmit = function (event) {
  event.preventDefault();

  var user = {
    name: $name.val().trim(),
    cell: $cell.val().trim(),
  };

  // if user doesn't fill in all fields display message
  if (!(user.name && user.cell)) {
    $("#first-error-message").text("Please enter a name and phone number");
    return;
  };

  API.getUser(user).then(function(data) {
    console.log(`data = ${JSON.stringify(data[0])}`);
    console.log(`name = ${data[0].name}`);
    location.replace("/second/" + data[0].name);
  });
};

// added by jodi
// on click function to take user to survey page
$("#go-to-survey").on("click", function (event) {
  event.preventDefault();

  window.location.href = "/survey";
});

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

