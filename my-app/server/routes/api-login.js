const fs = require('fs');

module.exports = (app) => {
  app.post('/login',function(req,res){

  // Debugging
  console.log('Hit by Angular');

  // Read the data from the JSON file and parse it to users
  let data = fs.readFileSync('users.json');
  let users = JSON.parse(data);

  if (!req.body) {
    return res.sendStatus(400);
  }

  // Object used to store user (customer) info
  let customer = {};
  customer.valid = false;
  customer.email = '';
  customer.username = '';
  customer.status = '';
  customer.groups = [];

  // For all users in the system
  for (let i = 0; i < users['users'].length; i++) {
    // If we find the matching email & password
    if (req.body.userEmail == users['users'][i].email && req.body.userPwd == users['users'][i].pwd){
      // Store the user info in an object
      customer.valid = true;
      customer.email = users['users'][i].email;
      customer.username = users['users'][i].username;
      customer.status = users['users'][i].status;
      customer.groups = users['users'][i].groups;
      }
    }
    // Send the object
    res.send(customer);
  });
}
