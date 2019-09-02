const fs = require('fs');

module.exports = (app) => {
  app.post('/removeFromChannel',function(req,res){

    // Debugging
    console.log('Hit by Angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Template object for storing the users.json file
    let userObject = { users: [] };

    // Read in the users data from JSON
    fs.readFile('users.json', 'utf8', (err, data) => {
      userObject = JSON.parse(data); // Set our object to the users JSON object
      // Find correct user
      for (let i = 0; i < userObject.users.length; i++) {
        if (req.body.user == userObject.users[i].username) {

          // Find correct group
          for (let j = 0; j < userObject.users[i].groups.length; j++) {
            if (req.body.group == userObject.users[i].groups[j].groupName) {

              // Find correct channel
              for (let k = 0; k < userObject.users[i].groups[j].channels.length; k++) {
                if (req.body.channel == userObject.users[i].groups[j].channels[k]) {
                  userObject.users[i].groups[j].channels.splice(k, 1); // Delete the channel
                  json = JSON.stringify(userObject, null, 2); // Convert it back to JSON
                  fs.writeFile('users.json', json, 'utf8', finished); // Write it back
                }
              }
            }
          }
        }
      }
    });

    // Debugging callback function
    function finished(err) {
      console.log('Successfuly removed user from channel!');
    }
  });
}
