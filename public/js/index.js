// Get references to page elements
var $name = $("#name");
var $cell = $("#number");
var $location = $("#location");
// var $locationText = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  // This function added by KB
  getMapData: function (search) {
    var url = "https://nominatim.openstreetmap.org/?format=json&limit=1&addressdetails=1&countrycodes=US&q="
    // var url = "https://nominatim.openstreetmap.org/?format=json&limit=1&addressdetails=1&countrycodes=US&q=Denver,CO"
    var queryTerm = '';
    for (let i = 0; i < search.length; i++) {
      if (search[i] === ' ') {
        queryTerm += '+';
      } else {
        queryTerm += search[i].toLowerCase();
      }
    }
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "GET",
      url: url + queryTerm,
      success: function (response) {
        console.log(JSON.stringify(response[0], null, 2));
        // TODO: Do we need to test for city value here???
        // if (response[0].address.city) {
        //     console.log(JSON.stringify(response));
        //     var city = response[0].address.city;
        //     //var postcode = response[0].address.postcode;
        //     var state = response[0].address.state;
        //     var lat = response[0].lat;
        //     var lon = response[0].lon;
        // } else {
        //     console.log(response);
        //     console.log('Incorrect search');
        // }

        // TODO: Do we need a DB push here???
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      }
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
var showMapData = function(data) {
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

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var user = {
    name: $name.val().trim(),
    cell: $cell.val().trim(),
    location: $location.val().trim()
    // location: $locationText.val().trim()
  };

  if (!(user.name && user.cell && user.location)) {
    alert("You must enter a name, number, and location");
    return;
  }

  console.log(`user = ${JSON.stringify(user)}`);
  API.saveExample(user).then(function () {
    refreshExamples();
  });

  API.getMapData(user.location).then(function (data) {
    // showMapData(JSON.stringify(data[0], null, 2));
});

  $name.val("");
  $cell.val("");
  $location.val("");
  // $locationText.val("");
};

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
$exampleList.on("click", ".delete", handleDeleteBtnClick);
