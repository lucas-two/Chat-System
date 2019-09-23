const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').Server(app);

const MongoClient = require('mongodb').MongoClient;
var  ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // old
app.use (bodyParser.json());

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
    if (err) {
        return console.log(err)
    }
    const dbName = 'chat';
    const db = client.db(dbName);

    require('./listen.js')(http);
    require('./routes/api-login.js')(db,app);

    // require('./routes/api-add.js') (db,app);
    // require('./routes/api-get.js') (db,app);
    // require('./routes/api-update.js') (db,app,ObjectID);
    // require('./routes/api-remove.js') (db,app,ObjectID);



});



// require('./listen.js')(http);
//
// require('./routes/api-add-user.js')(app);
// require('./routes/api-get-users.js')(app);
// require('./routes/api-delete-user.js')(app);
// require('./routes/api-update-status.js')(app);
// require('./routes/api-get-groups.js')(app);
// require('./routes/api-add-to-group.js')(app);
// require('./routes/api-add-to-channel.js')(app);
// require('./routes/api-remove-from-group.js')(app);
// require('./routes/api-remove-from-channel.js')(app);
// require('./routes/api-add-group.js')(app);
// require('./routes/api-add-channel.js')(app);
// require('./routes/api-delete-group.js')(app);
// require('./routes/api-delete-channel.js')(app);
