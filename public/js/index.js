// Get references to page elements
var $name = $("#name");
var $cell = $("#number");
var $location = $("#location");

var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
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
      url: "/second",
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

var validatePhone = function (num) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (num.match(phoneno)) {
    return true;
  }
  else {
    return false;
  }
}

// handle form submit user info with onclick and redirects to second page
var handleFormSubmit = function (event) {
  event.preventDefault();

  var user = {
    name: $name.val().trim(),
    cell: $cell.val().trim(),
  };

  // if user doesn't fill in all fields display message
  if (!user.name) {
    $("#first-error-message").text("Name is required");
    return;
  } else if (!user.cell) {
    $("#first-error-message").text("Cell number is required");
    return;
  } else if (!validatePhone(user.cell)) {
    $("#first-error-message").text("A valid cell number is required");
    return;
  } else {
    $("#first-error-message").text("");
  }

  API.getUser(user).then(function (data) {
    console.log(`data = ${JSON.stringify(data[0])}`);
    console.log(`name = ${data[0].name}`);

    // Store the userid in the session since we'll need it later for saving 
    // the user's chosen restaurant. In the real world this should be handled
    // by using something like Passport.
    sessionStorage.setItem("userID", data[0].id);
    console.log(`userID = ${sessionStorage.getItem("userID")}`);
    
    location.replace("/second/" + user.cell);
  });
};

// added by jodi
// on click function to take user to survey page
$("#go-to-survey").on("click", function (event) {
  event.preventDefault();

  window.location.href = "/survey";
});

// added by jodi
// on click for each emoji rating
$(".rate-emojis").on("click", function () {
  var emoji = $(this).attr("id");
  $(this).addClass("emojiclicked")
  console.log(emoji);
  $(this).off("click");
});

// $(".rate-emojis").on("click", function () {
//   var emoji = $(".rate-emojis");
//   for (var i = 0; i < emoji.length; i++) {
//     $(this).addClass("emojiclicked");
//     $(this).off("click");
    
//   }

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

