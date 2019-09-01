const fs = require('fs');

module.exports = (app) => {
  app.post('/addToGroup',function(req,res){

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
        if (req.body.userID == userObject.users[i].username) {
          userObject.users.groups.push(req.body); // Push object to groups
          json = JSON.stringify(userObject, null, 2); // Convert it back to JSON
          fs.writeFile('users.json', json, 'utf8', finished); // Write it back
        }
      }
    });

    // Debugging callback function
    function finished(err) {
      console.log('Successfuly added user to group!');
    }
  });
}
