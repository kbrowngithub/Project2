# RESTAURANT FINDER 🍴🍕🍜🥗

Find a restaurant [here](app link)

## Overview
Can’t decide where to eat?
We’ve been there...

That’s why we created Restaurant Finder. 

A 10 question survey takes in your cravings, dietary restrictions, favorites and more, to help you find the right restaurant in your area or town you’re visiting.

Finally put an end to the never ending… “I don’t know where to eat, where do you want to eat?”
 
Because we know everyone hates that conversation.

---

This is a full stack application using Node, Express, Handlebars, MySQL, and Sequalize ORM

---

## Technologies Used:
- Handlebars/HTML (https://handlebarsjs.com/guide/)
- Bootstrap/Custom CSS (https://getbootstrap.com/)
- MySQL Database (https://www.mysql.com/)
- Sequelize ORM (https://sequelize.org/) 
- jQuery (https://jquery.com/)
- JavaScript (https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- SurveyJS (https://surveyjs.io/)
- Open Street Map API (https://wiki.openstreetmap.org/wiki/API)
- TripAdvisor API (https://rapidapi.com/apidojo/api/tripadvisor1?endpoint=apiendpoint_c0d6decf-e541-447d-bc87-2fa023cd96d6)
- Node.js (https://nodejs.org/en/)
- Deployed with Heroku (https://www.heroku.com/)

---

## Structure/Flowchart
![Image](public/images/flowchart.png)

---

## If you want to clone the app down to your local machine:
1. Use MySQL Workbench to create a database called ```restaurant_db```
- The raw SQL query is ```CREATE DATABASE restaurant_db;```
2. Inside the config folder, open up the ```config.json``` file
- In the development object, add your MySQL localhost ```password```
3. In your terminal, ```cd``` into the project folder and run:
- ```npm install``` to download all node.js dependencies
- ```npm install sequelize``` to install Sequelize
4. Finally, you can run the application using:
- ```node server.js``` in the terminal to start the node server
- Navigating to localhost:3000 in your browser.

---

## Acknowledgments
- Unsplash (https://unsplash.com/) Attribution free photography

## Authors
- Kevin Brown - [kbrowngithub](https://github.com/kbrowngithub)
- Nathaniel Anderson - [Nathaniel-DU](https://github.com/Nathaniel-DU)
- Jodi Tivis - [joditivis](https://github.com/joditivis)