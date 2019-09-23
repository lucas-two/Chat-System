const fs = require('fs');

module.exports = (app) => {
  app.post('/deleteChannel',function(req,res){

    // Debugging
    console.log('api-delete-channel hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Object for storing the groups.json file
    let groupObject = { groups: [] };

    // Deleting the channel
    fs.readFile('groups.json', 'utf8', (err, data) => {
      groupObject = JSON.parse(data); // Parse the JSON
      for (let i = 0; i < groupObject.groups.length; i++) {
        // If we find correct group
        if (req.body.group == groupObject.groups[i].groupName) {
          for (let j = 0; j < groupObject.groups[i].channels.length; j++) {
            // If we find correct channel
            if (req.body.channel == groupObject.groups[i].channels[j]) {
              groupObject.groups[i].channels.splice(j, 1); // Remove group
              json = JSON.stringify(groupObject, null, 2); // Convert new object back to JSON
              fs.writeFile('groups.json', json, 'utf8', finished); // Write JSON back to file
            }
          }
        }
      }
    });

    // NOTE: Removing all users from the channel was not implement with similar trouble to groups.

    function finished(err) {
      console.log('Successfuly deleted channel!');
    }

  });
}
