const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');

// connect to database
db.connect((err) => {
    if(err) throw err;
    console.log("MySQL connected...");
});

// set views engine
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));

// route for homepage
app.get("/", (req, res) => {
    const data = response(200, "data", "OK", res);
});

// test server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`);
});

