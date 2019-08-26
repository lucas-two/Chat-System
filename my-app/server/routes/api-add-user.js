// Trying to create an API that will add new users to the users.json file

const fs = require('fs');

module.exports = (app) => {
  app.post('/addUser',function(req,res){

    console.log('Hit by Angular'); // DEBUGGING ONLY

    if (!req.body) {
      return res.sendStatus(400);
    }

    var data = JSON.stringify(req.body, null, 2);
    fs.writeFile('users.json', data, finished);

    function finished(err) {
      console.log('Complete');
    }
  });
}
