Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "completedHtml": "<h3>Restaurant Recommendations</h3>",
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
            title: "You tend to appreciate vegan options on a menu.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q3",
            title: "You're in a hurry.",
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
            title: "you need gluten free options.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q7",
            title: "sandwiches sound amazing.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q8",
            title: "Your in the mood for a great salad.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q9",
            title: "you would love a buffet.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        },
        {
            type: "rating",
            isRequired: true,
            name: "q10",
            title: "you need a good apatizer.",
            minRateDescription: "1 (Strongly Disagree)",
            maxRateDescription: "5 (Strongly Agree)"
        }
    ]
};

window.survey = new Survey.Model(json);

survey.onComplete.add(function (result) {
    var userData = {
        scores: [
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
        ]
    };


    $.post("/api/restaurants", userData, function (data) {
        console.log(`Data from post to /api/restaurants = ${JSON.stringify(data, null, 3)}`);

        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        console.log(`Restaurant Results: ${JSON.stringify(data, null, 3)}`);
        $('#rname').text(data.name);
        $('#raddress').text(data.address);
        $('#rphone').text(data.phone);
    });

    var search = []
    console.log(userData)
    if(result.data.q1 >= 3){
        search.push('spicy')
    }
    if(result.data.q2 >= 3){
        search.push('vegan')
    }
    if(result.data.q3 >= 3){
        search.push('fast%20food')
    }
    if(result.data.q4 >= 3){
        search.push('sea%20food')
    }
    if(result.data.q5 >= 3){
        search.push('family%20style')
    }
    if(result.data.q6 >= 3){
        search.push('gluten%20free')
    }
    if(result.data.q7 >= 3){
        search.push('sandwiches')
    }
    if(result.data.q8 >= 3){
        search.push('salads')
    }
    if(result.data.q9 >= 3){
        search.push('buffet')
    }
    if(result.data.q10 >= 3){
        search.push('apatizers')
    }

    API.getTripAdvisor("Houston", search)
        .then(function (data) {
            console.log("NATHANIEL'S APICALL: ", data)
        }).catch(function (error) {
            console.log(error)
        })
});

$("#surveyElement").Survey({ model: survey });