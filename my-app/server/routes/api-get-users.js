const fs = require('fs');

module.exports = (app) => {
  app.get('/getUsers',function(req,res){

    console.log('Hit by Angular'); // DEBUGGING ONLY
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Object for storing the users.json file
    let userObject = { users: [] };

    fs.readFile('users.json', 'utf8', (err, data) => {
      userObject = JSON.parse(data);
      res.send(userObject.users);
      });
  });
}
