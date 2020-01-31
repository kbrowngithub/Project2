//assign call to onServerValidateQuestions callback
function surveyValidateQuestion(survey, options) {
    //options.data contains the data for the current page.
    var countryName = options.data["City"];
    //If the question is empty then do nothing
    // if (!countryName)
    //     options.complete();

    //call the ajax method
    $
        .ajax({ url: "/api/validateloc/" + countryName })
        .then(function (data) {
            // var found = false;
            // var countries = data;
            // for (var i = 0; i < countries.length; i++) {
            //     if (countries[i].name == countryName) {
            //         found = true;
            //         break;
            //     }
            // }
            console.log(`survey validator: data = ${data}`);

            //if the country is unknown, add the error
            // if (!found)
            if (!data) {
                alert("Please enter a valid location.")
                options.errors["City"] = "The location '" + countryName + "' is not valid";
            }

            //tell survey that we are done with the server validation
            options.complete();
            
        });
}



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

survey.onServerValidateQuestions.add(surveyValidateQuestion);
survey.onComplete.add(function (result) {
    console.log("Survey Complete function");

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

    // added by jodi
    // on click function to open survey results modal
    // $(document).on("click", "input[type='button'][value='Complete']", function (event) {
        // event.preventDefault();
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
            for (var i = 0; i < data.data.length; i++) {
                $(".suggested-restaurants").append(`<ul class="list-group">
                <h5 class="restaurant-name">${data.data[i].name}
                <input class="form-check-input position-static float-right" type="radio" name="blankRadio"
                value="${data.data[i].name}" data-addr="${data.data[i].address}" data-phone="${data.data[i].phone}" aria-label="..."></h5>
        
                <p class="restaurant-addr" data-addr="${data.data[i].address}">${data.data[i].address}</p>
                <p class="restaurant-phone" data-phone="${data.data[i].phone}">${data.data[i].phone}</p>
                <br>
                <hr>
                </ul>`);

            }
        }).then(function () {

            $("#results-modal").modal("toggle");
            $(".sv-completedpage").hide();
            //hides surveyJS results page

        });
    // });

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
        $.post("/api/save-restaurant/" + userId, {
            restaurantName: $("input:checked").val(),
            restaurantAddr: $("input:checked").data("addr"),
            restaurantPhone: $("input:checked").data("phone"),
            id: userId
        }).then(function (response) {
            // window.location.replace(response);
            window.location.replace("/backtostart/" + userId);
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