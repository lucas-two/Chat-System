const fs = require('fs');

module.exports = (app) => {
  app.post('/deleteGroup',function(req,res){

    // Debugging
    console.log('Hit by Angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Object for storing the groups.json file
    let groupObject = { groups: [] };

    // Object for storing the user.json file
    let userObject = { users: [] };

    // Deleting the group
    fs.readFile('groups.json', 'utf8', (err, data) => {
      groupObject = JSON.parse(data); // Parse the JSON
      for (let i = 0; i < groupObject.groups.length; i++) {
        // If we find correct group
        if (req.body.group == groupObject.groups[i].groupName) {
          groupObject.groups.splice(i, 1); // Remove group
          json = JSON.stringify(groupObject, null, 2); // Convert new object back to JSON
          fs.writeFile('groups.json', json, 'utf8', finished); // Write JSON back to file
        }
      }
    });

    // NOTE: This was causing bugs and due to time constrains was not implemented

    // Removing all users from the group
    // fs.readFile('users.json', 'utf8', (err, data) => {
    //   userObject = JSON.parse(data); // Set our object to the users JSON object
    //   // Find correct user
    //   for (let i = 0; i < userObject.users.length; i++) {
    //       // Find correct group
    //       for (let j = 0; j < userObject.users[i].groups.length; j++) {
    //         if (req.body.group == userObject.users[i].groups[j].groupName) {
    //             userObject.users[i].groups.splice(j, 1); // Delete the group
    //         }
    //       }
    //     }
    //     json = JSON.stringify(userObject, null, 2); // Convert it back to JSON
    //     fs.writeFile('users.json', json, 'utf8', finishedTwo); // Write it back
    // });

    function finished(err) {
      console.log('Successfuly deleted group!');
    }

    // function finishedTwo(err) {
    //   console.log('Successfuly removed user from deleted group!');
    // }
  });
}
