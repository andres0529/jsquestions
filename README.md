
# GAME JS
The purpose of my application is to provide a platform for users to register and take challenges related to JavaScript. The application will offer various types of challenges such as multiple-choice questions, coding challenges, and true or false questions to test the user's knowledge and skills in JavaScript. The goal of the application is to provide a fun and engaging way for users to learn and improve their JavaScript skills. By completing challenges and tracking their progress, users will be able to see their growth and build their confidence in using JavaScript.


## Usage

## Installation

    1) Clone this repository to your local machine.
    2) Install the necessary dependencies by running npm install.
    3) Create the .env file where you include the next variables:
        -)  Development port
        -)    DEV_PORT
        -)    PROD_PORT
        -)    URI_STRING = mongoURI string
        -)    PASSPORT_SECRET = 200491265

    4) After create your DB in Mongo, you coud use MongoCompas or Mongosh to populate the table "questions".
    Location: ./db/questions.js
    5) npm run dev



 ##  Dependencies
This Website requires the following dependencies:

- express js
- mongoose
- dotenv
- handlebars