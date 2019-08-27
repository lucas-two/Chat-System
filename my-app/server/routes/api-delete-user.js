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

      userObject.users.splice(req.body.userId - 1, 1);; // Delete the record

      json = JSON.stringify(userObject, null, 2); // Convert it back to JSON
      fs.writeFile('users.json', json, 'utf8', finished); // Write it back
    });

    function finished(err) {
      console.log('Successfuly deleted user!');
    }
  });
}
