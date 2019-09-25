const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const formidable = require('formidable');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
var  ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // old
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
    if (err) {
        return console.log(err)
    }
    const dbName = 'chat';
    const db = client.db(dbName);

    require('./listen.js')(http);
    require('./routes/api-login.js')(db,app);
    require('./routes/api-add-user.js')(db,app);
    require('./routes/api-get-users.js')(db,app);
    require('./routes/api-get-groups.js')(db,app);
    require('./routes/api-add-group.js')(db,app);
    require('./routes/api-add-channel.js')(db,app);
    require('./routes/api-update-status.js')(db,app);
    require('./routes/api-delete-user.js')(db,app);
    require('./routes/api-add-to-group.js')(db,app);
    require('./routes/api-add-to-channel.js')(db,app);
    require('./routes/api-remove-from-group.js')(db,app);
    require('./routes/api-remove-from-channel.js')(db,app);
    require('./routes/api-delete-group.js')(db,app);
    require('./routes/api-delete-channel.js')(db,app);
    require('./routes/api-upload-image.js')(db,formidable,app);
});
