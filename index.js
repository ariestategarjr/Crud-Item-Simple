const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');
const { get } = require('http');

// connect to database
db.connect((err) => {
    if(err) throw err;
    console.log("MySQL connected...");
});

// set views engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));

// route for homepage
app.get("/", (req, res) => {
    // const data = response(200, "data", "OK", res);
    const getSQL = "SELECT * FROM stock";
    db.query(getSQL, (err, result) => {
        const items = JSON.parse(JSON.stringify(result));
        res.render("view_stock", { items: items, title: "Simple Stock Items App" });
    });
});

// test server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`);
});

