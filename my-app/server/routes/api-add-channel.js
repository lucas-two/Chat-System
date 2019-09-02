const fs = require('fs');

module.exports = (app) => {
  app.post('/createChannel',function(req,res){

    // Debugging
    console.log('Hit by Angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Object for storing the users.json file
    let groupObject = { groups: [] };

    fs.readFile('groups.json', 'utf8', (err, data) => {
        groupObject = JSON.parse(data); // Parse the JSON
        //NOTE: should later add checking to see if channel already exists
        for (let i = 0; i < groupObject.groups.length; i++) {
          // If we find correct group
          if (req.body.group == groupObject.groups[i].groupName) {
            groupObject.groups[i].channels.push(req.body.channel); // Add the group to the object
            json = JSON.stringify(groupObject, null, 2); // Convert new object back to JSON
            fs.writeFile('groups.json', json, 'utf8', finished); // Write JSON back to file
          }
        }
      });

    // Debugging callback function
    function finished(err) {
      console.log('Successfuly created channel!');
    }
  });
}
