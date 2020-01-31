Survey
    .StylesManager
    .applyTheme("modern");

// function validateZipCode(elementValue) {
//     var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
//     return zipCodePattern.test(elementValue);
// }

// function validateAddress(address) {
//     var addr;
//     var city = "";
//     var state = "";
//     var zip = "";

//     if (address !== undefined && address !== null) {
//         if (address.indexOf(",") !== -1) {
//             addr = address.split(",");
//         }
//         else {
//             addr = address.split(" ");
//         }
//         state = addr.pop().trim();
//         if (state.match(/^[0-9]+$/) !== null) {
//             zip = state;
//             state = "";
//         }

//         city = addr.join(" ").trim();
//         console.log("City = " + city);
//         console.log("State = " + state);
//         console.log("Zip = " + zip);
//     }
// }

var json = {
    "completedHtml": "<h3>One Moment While We Process Your Results ...</h3>",
    "completedHtmlOnCondition": [
        {
            "expression": "{nps_score} > 5",
            "html": "<h5>Conditional message here!</h5>"
        }, {
            "expression": "{nps_score} < 5",
            "html": "<h5>Alternative conditional message here!</h5>\n"
        }
    ],
    questions: [
        {
            type: "text",
            name: "City",
            title: "Enter Your Location: City, State or Zip:",
            
            
            
        },
        {
            type: "rating",
            isRequired: true,
            name: "q1",
            title: "You like spicy food.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q2",
            title: "You appreciate vegan options on a menu.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q3",
            title: "You are in a hurry.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q4",
            title: "You are in the mood for seafood.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q5",
            title: "You like home cooked meals.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q6",
            title: "You need gluten free options.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q7",
            title: "Sandwiches sound amazing.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q8",
            title: "You are in the mood for a great salad.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q9",
            title: "You would love a buffet.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q10",
            title: "You need a good appetizer.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        }
    ]
};

window.survey = new Survey.Model(json);
// var loc = "80919"; // For testing only, needs to be populated from question block above

survey.onComplete.add(function (result) {

    var loc = result.data.City;
    

    if (result.data.q1 >= 3) {
        result.data.q1 = 'spicy';
    }
    if (result.data.q2 >= 3) {
        result.data.q2 = 'vegan';
    }
    if (result.data.q3 >= 3) {
        result.data.q3 = 'fast%20food';
    }
    if (result.data.q4 >= 3) {
        result.data.q4 = 'sea%20food';
    }
    if (result.data.q5 >= 3) {
        result.data.q5 = 'family%20style';
    }
    if (result.data.q6 >= 3) {
        result.data.q6 = 'gluten%20free';
    }
    if (result.data.q7 >= 3) {
        result.data.q7 = 'sandwiches';
    }
    if (result.data.q8 >= 3) {
        result.data.q8 = 'salads';
    }
    if (result.data.q9 >= 3) {
        result.data.q9 = 'buffet';
    }
    if (result.data.q10 >= 3) {
        result.data.q10 = 'apatizers';
    }

    var scores = [
        result.data.q1,
        result.data.q2,
        result.data.q3,
        result.data.q4,
        result.data.q5,
        result.data.q6,
        result.data.q7,
        result.data.q8,
        result.data.q9,
        result.data.q10
    ];

   var userData = {
        loc: loc,
        scores: scores.join("%252C")
    };

    // console.log(`survey.js: sending userData = ${JSON.stringify(userData, null, 3)}`);
    // $.post("/api/restaurants", userData, function (data) {
    //     console.log(`Data from post to /api/restaurants = ${JSON.stringify(data, null, 3)}`);
    //     if (data.status === 404) {
    //         console.log("No data for that location");
    //     }
    //     else {
    //         // window.location.replace("/restaurants");
    //     }
        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        // console.log(`Restaurant Results: ${JSON.stringify(data, null, 3)}`);
        // $('#rname').text(data.name);
        // $('#raddress').text(data.address);
        // $('#rphone').text(data.phone);

    // });

    // added by jodi
    // on click function to open survey results modal
    var restaurantsArr;
    $(document).on("click", "input[type='button'][value='Complete']", function (event) {
        event.preventDefault();
        console.log(`survey.js: sending userData = ${JSON.stringify(userData, null, 3)}`);
        $.post("/api/restaurants", userData, function (data) {
            restaurantsArr = data.data;
            console.log(`Data from post to /api/restaurants = ${JSON.stringify(data, null, 3)}`);
            if (data.status === 404) {
                console.log("No data for that location");
            }
            else {
                // window.location.replace("/restaurants");
            }
            for (var i = 0;i<data.data.length;i++){
                $(".suggested-restaurants").append(`<p class="restaurant-names">${data.data[i].name} ${data.data[i].address} ${data.data[i].phone}<input
                class="form-check-input position-static float-right" type="radio" name="blankRadio"
                value="${data.data[i].name} ${data.data[i].address} ${data.data[i].phone}" aria-label="..."></p>`);
                
            }
            // Grab the result from the AJAX post so that the best match's name and photo are displayed.
            // console.log(`Restaurant Results: ${JSON.stringify(data, null, 3)}`);
            // $('#rname').text(data.name);
            // $('#raddress').text(data.address);
            // $('#rphone').text(data.phone);
        }).then(function () {
            
            $("#results-modal").modal("toggle");
            $(".sv-completedpage").hide();
            //hides surveyJS results page
            
        });
    });

    // exit button on survey will take user to home page
    $("#survey-exit-btn").on("click", function (event) {
        event.preventDefault();

        window.location.replace("/");
    });

    // added by jodi
    // save button on results modal will capture user's selected restaurant, save to DB, and return user to user landing page
    $(document).on("click", "#survey-save-btn", function (event) {
        event.preventDefault();

        var userId = sessionStorage.getItem("userID");
        $.post("/api/save-restaurant/"+userId, {
            restaurantName: $("input:checked").val(),
            restaurantAddr: "Addr 1",
            restaurantPhone: "Phone 1",
            id: userId
        }).then(function (response) {
            // window.location.replace(response);
            window.location.replace("/backtostart/"+userId);
        });
    });

    // API.getTripAdvisor(location, search)
    //     .then(function (data) {
    //         console.log("NATHANIEL'S APICALL: ", data);
    //     }).catch(function (error) {
    //         console.log(error)
    //     });

});
$("#surveyElement").Survey({ model: survey });