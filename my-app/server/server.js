const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('http://localhost:4200'));

// require('./routes/api-login.js')(app);
require('./listen.js')(http);
require('./routes/api-login.js')(app);
