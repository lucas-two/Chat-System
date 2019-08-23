module.exports = (app) => {
  app.post('/login',function(req,res){

  console.log('Hit by Angular'); // DEBUGGING ONLY

  let users = [
    {
    'email':'a@mail.com',
    'pwd':'123',
    'id':1,
    'username':'Alice',
    'birthdate':'11-11-1964',
    'age':50
    },
    {
    'email':'b@mail.com',
    'pwd':'123',
    'id':2,
    'username':'Bob',
    'birthdate':'11-11-1964',
    'age':24
    },
    {
    'email':'c@mail.com',
    'pwd':'123',
    'id':3,
    'username':'Connor',
    'birthdate':'11-11-1964',
    'age':76
    }
  ];

  if (!req.body) {
    return res.sendStatus(400);
  }

  let customer = {};
  customer.valid = false;
  customer.email = '';
  customer.username = '';
  customer.birthdate = '';
  customer.age = 0;
  customer.id = 0;

  for (let i = 0; i < users.length; i++){

    console.log(req.body.userEmail); // DEBUGGING ONLY

    if (req.body.userEmail == users[i].email && req.body.userPwd == users[i].pwd){
      customer.valid = true;
      customer.email = users[i].email;
      customer.username = users[i].username;
      customer.birthdate = users[i].birthdate;
      customer.age = users[i].age;
      customer.id = users[i].id;
      }
    }
    // Send the customer object on
    res.send(customer);
  });
}
