const fs = require('fs');

module.exports = (app) => {
  app.post('/createGroup',function(req,res){

    // Debugging
    console.log('Hit by Angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Object for storing the users.json file
    let groupObject = { groups: [] };

    fs.readFile('groups.json', 'utf8', (err, data) => {

        //NOTE: should later add checking to see if group already exists

        groupObject = JSON.parse(data); // Parse the JSON
        groupObject.groups.push(req.body); // Add the group to the object
        json = JSON.stringify(groupObject, null, 2); // Convert new object back to JSON
        fs.writeFile('groups.json', json, 'utf8', finished); // Write JSON back to file
      });

    // Debugging callback function
    function finished(err) {
      console.log('Successfuly created group!');
    }
  });
}
