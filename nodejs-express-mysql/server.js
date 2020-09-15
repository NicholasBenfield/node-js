const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse request of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www/form/urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// A Simple Route
app.get("/", (req,res) => {
    res.json({ message: "Welcome to the base NodeJS application!"});
});

require('./app/routes/customer.routes')(app); 

// Sets the port for the web server to listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});