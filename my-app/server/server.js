const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const formidable = require('formidable');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io')(http);

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting up path for image storage
app.use(express.static(path.join(__dirname, '../dist/imageupload')));
app.use('/images', express.static(path.join(__dirname, './userimages')));

// Exporting app
module.exports = app;

// URL of mongodb
const url = 'mongodb://localhost:27017';

// Defining name of database
const dbName = 'chat';

// Setting up socket
const sockets = require('./sockets.js');
const PORT = 3000;
sockets.connect(io, PORT);

// Importing Listen
require('./listen.js')(http);

// Importing APIs
require('./routes/api-login.js')(MongoClient,url,dbName,app); // !
require('./routes/api-add-user.js')(MongoClient,url,dbName,app); // !
require('./routes/api-get-users.js')(MongoClient,url,dbName,app); // !
require('./routes/api-get-groups.js')(MongoClient,url,dbName,app); // !
require('./routes/api-add-group.js')(MongoClient,url,dbName,app);
require('./routes/api-add-channel.js')(MongoClient,url,dbName,app);
require('./routes/api-update-status.js')(MongoClient,url,dbName,app);
require('./routes/api-delete-user.js')(MongoClient,url,dbName,app); // !
require('./routes/api-add-to-group.js')(MongoClient,url,dbName,app);
require('./routes/api-add-to-channel.js')(MongoClient,url,dbName,app);
require('./routes/api-remove-from-group.js')(MongoClient,url,dbName,app);
require('./routes/api-remove-from-channel.js')(MongoClient,url,dbName,app);
require('./routes/api-delete-group.js')(MongoClient,url,dbName,app);
require('./routes/api-delete-channel.js')(MongoClient,url,dbName,app);
require('./routes/api-upload-image.js')(MongoClient,url,dbName,app,formidable);
