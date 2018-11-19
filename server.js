'use strict';
(function () {
    const express = require('express');
    const path = require('path');
    const mongoose = require('mongoose');
    const controller = require('./routes/controller.js');
    const bodyParser = require('body-parser');
    const app = express();
    const PORT = process.env.PORT || 3002;
    const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Y-Combinator';

    mongoose.connect(URI);
    const db = mongoose.connection;

    db.on('error', (error) => {
        console.log('Error: ' + error);
    });

    db.once('open', () => {        
        console.log("Connected to MongoDB");
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));
    
    const exphbs = require("express-handlebars");
    app.engine("handlebars", exphbs({
        defaultLayout: "main"
    }));
    app.set("view engine", "handlebars");

    app.use(express.static("public"));

    app.use('/', controller);
    
    app.listen(PORT, () => {
        console.log("Listening on PORT " + PORT);
    });
}());