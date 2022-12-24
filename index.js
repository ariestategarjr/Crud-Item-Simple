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
    const sql = "SELECT * FROM stock";
    db.query(sql, (err, result) => {
        if(err) throw err;
        const items = JSON.parse(JSON.stringify(result));
        res.render("view_stock", { items: items });
    });
});

// route for detail
app.post("/detail", (req, res) => {
    const { kode_barang } = req.body;
    const sql = `SELECT * FROM stock WHERE kode_barang = '${kode_barang}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        const item = JSON.parse(JSON.stringify(result));
        res.send(item);
    });
});

// route for add new item
app.post("/save", (req, res) => {
    const { kode_barang, nama_barang, stok_barang } = req.body;
    const sql = `INSERT INTO stock (kode_barang, nama_barang, stok_barang) 
                 VALUES ('${kode_barang}', '${nama_barang}', '${stok_barang}')`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect("/");
    });
});

// route for update item 
app.post("/update", (req, res) => {
    const { kode_barang, nama_barang, stok_barang } = req.body;
    const sql = `UPDATE stock SET nama_barang = '${nama_barang}', stok_barang = '${stok_barang}' WHERE kode_barang = '${kode_barang}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect("/");
    });
});

// route for delete item
app.post("/delete", (req, res) => {
    const { kode_barang } = req.body;
    const sql = `DELETE FROM stock WHERE kode_barang='${kode_barang}'`;
    db.query(sql, (err, result) => {
        console.log(result);
        if(err) throw err;
        res.redirect("/");
    });
});

// test server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`);
});

