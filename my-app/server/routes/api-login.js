const fs = require('fs');

module.exports = (app) => {
  app.post('/login',function(req,res){

  console.log('Hit by Angular'); // DEBUGGING ONLY

  let data = fs.readFileSync('users.json');
  let users = JSON.parse(data);

  if (!req.body) {
    return res.sendStatus(400);
  }

  let customer = {};
  customer.valid = false;
  customer.email = '';
  customer.username = '';
  customer.status = '';

  for (let i = 0; i < users['users'].length; i++) {

    console.log(req.body.userEmail); // DEBUGGING ONLY

    if (req.body.userEmail == users['users'][i].email && req.body.userPwd == users['users'][i].pwd){

      customer.valid = true;
      customer.email = users['users'][i].email;
      customer.username = users['users'][i].username;
      customer.status = users['users'][i].status;
      }
    }
    // Send the customer object on
    res.send(customer);
  });
}
