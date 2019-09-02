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

require('./listen.js')(http);
require('./routes/api-login.js')(app);
require('./routes/api-add-user.js')(app);
require('./routes/api-get-users.js')(app);
require('./routes/api-delete-user.js')(app);
require('./routes/api-update-status.js')(app);
require('./routes/api-get-groups.js')(app);
require('./routes/api-add-to-group.js')(app);
require('./routes/api-add-to-channel.js')(app);
require('./routes/api-remove-from-group.js')(app);
require('./routes/api-remove-from-channel.js')(app);
require('./routes/api-add-group.js')(app);

