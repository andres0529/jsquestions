require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
const routerApi = require("./routes");
const PORT = process.env.DEV_PORT || 3000;
app.use(express.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


routerApi(app);
// Listening PORT
app.listen(PORT, () => {
  console.log("App runing in PORT: " + PORT);
});