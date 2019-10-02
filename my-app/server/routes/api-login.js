module.exports = (MongoClient,url,dbName,app) => {
  app.post('/login',function(req,res){

    // Error handling
    if (!req.body) {
      return res.sendStatus(400)
    }

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use USERS collection

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
  });
}
