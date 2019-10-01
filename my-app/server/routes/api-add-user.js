module.exports = (MongoClient,url,dbName,app) => {
  app.post('/addUser',function(req,res){

    // Debugging
    console.log('api-add-user hit angular');

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    const userObj = req.body; // Store the sent user object
    let existing = true; // Flag for wheather user was existing

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use the USERS collection

      // Is there a duplicate email or username?
      collection.find({"$or": [{"username": userObj.username}, {"email": userObj.email}]}).count((err,count)=>{

        // If there are no duplicates
        if (count == 0) {
          // Add the user
          collection.insertOne(userObj, () => {
            existing = false;
            res.send(existing);
          });
        }

        // If there are duplicates
        else {
          res.send(existing);
        }
      });
    });
  });
}
