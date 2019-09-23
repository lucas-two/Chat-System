module.exports = (db,app) => {
  app.post('/login',function(req,res){

    // Debugging
    console.log("api-login hit angular");
    if (!req.body) {
      return res.sendStatus(400)
    }

    // Use USERS collection
    const collection = db.collection('users');

    // Object for storing user info
    let userObj = {};
    userObj.valid = false;
    userObj.email = '';
    userObj.username = '';
    userObj.status = '';
    userObj.groups = [];

    // We want to find the input email and password
    let query = {'email': req.body.userEmail, 'pwd': req.body.userPwd}

    // Run query
    collection.findOne(query).then(doc => {

      // Valid user
      if(doc != null) {
        userObj.valid = true;
        userObj.email = doc.email;
        userObj.username = doc.username;
        userObj.status = doc.status;
        userObj.groups = doc.groups;
        res.send(userObj);
      }
      // Invalid user
      else {
        res.send(userObj);
      }
    });
  });
}
