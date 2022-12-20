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

// use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route for homepage
app.get("/", (req, res) => {
    const data = response(200, "data", "OK", res);
});

// test server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`);
});

