const fs = require('fs');

module.exports = (app) => {
  app.post('/deleteUser',function(req,res){

    console.log('Hit by Angular'); // DEBUGGING ONLY
    if (!req.body) {
      return res.sendStatus(400);
    }

    let userObject = {
      users: []
   };

    fs.readFile('users.json', 'utf8', (err, data) => {
      userObject = JSON.parse(data); // Set our object to the users JSON object

      for (let i = 0; i < userObject.users.length; i++) {
        if (req.body.userID == userObject.users[i].username) {
          userObject.users.splice(i, 1);
          json = JSON.stringify(userObject, null, 2); // Convert it back to JSON
          fs.writeFile('users.json', json, 'utf8', finished); // Write it back
        }
      }
    });

    function finished(err) {
      console.log('Successfuly deleted user!');
    }
  });
}