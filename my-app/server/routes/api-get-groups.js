const fs = require('fs');

module.exports = (app) => {
  app.get('/getGroups',function(req,res){

    // Debugging
    console.log('Hit by Angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Object for storing the users.json file
    let groupObject = { groups: [] };

    fs.readFile('groups.json', 'utf8', (err, data) => {
      groupObject = JSON.parse(data);
      res.send(groupObject.groups);
      });
  });
}
