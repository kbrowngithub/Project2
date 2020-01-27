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
        }
    ]
};

window.survey = new Survey.Model(json);

survey.onComplete.add(function (result) {
    var userData = {
        scores: [
            result.data.q1,
            result.data.q2,
            result.data.q3
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

    API.getTripAdvisor("Houston", search)
        .then(function (data) {
            console.log("NATHANIEL'S APICALL: ", data)
        }).catch(function (error) {
            console.log(error)
        })
});

$("#surveyElement").Survey({ model: survey });