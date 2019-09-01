const fs = require('fs');

module.exports = (app) => {
  app.post('/addUser',function(req,res){

    // Debugging
    console.log('Hit by Angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Template object for storing the users.json file
    let userObject = { users: [] };
    let existing = false; // Flag for if user is existing or not.

    // Read in the users data from JSON
    fs.readFile('users.json' , 'utf8', (err, data) => {
      userObject = JSON.parse(data); // Copy users JSON into the template object

      // Check if user is already existing
      for (let i = 0; i < userObject.users.length; i++) {
        if(req.body.username === userObject.users[i].username || req.body.email === userObject.users[i].email){
          existing = true; // Set flag if is existing
        }
      }
      if(existing === false) {
        userObject.users.push(req.body); // Add the user to the object
        json = JSON.stringify(userObject, null, 2); // Convert new object back to JSON
        fs.writeFile('users.json', json, 'utf8', finished); // Write JSON back to file
      }
      res.send(existing); // Send existing flag
    });

    // Debugging callback function
    function finished(err) {
      console.log('Successfuly added user!');
    }
  });
}
