const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection');

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

