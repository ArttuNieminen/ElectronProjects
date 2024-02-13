const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const setupRoutes = require('./route_handler'); // Adjust the path accordingly

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Call setupRoutes to configure the routes
setupRoutes(app);

app.listen(5002, function () {
  console.log('CORS-enabled web server listening on port 5002');
});