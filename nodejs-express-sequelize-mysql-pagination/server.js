const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse the results for content-type - application/json
app.use(bodyParser.json());

// Parse request for content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();
// Simple route
app.get('/', (req,res) => {
    res.json({ message: "Welcome to a NodeJS Application"});
});

require("./app/routes/tutorial.routes")(app); 

// Set the port to run off of
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});