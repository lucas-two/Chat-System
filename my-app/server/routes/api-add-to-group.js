module.exports = (MongoClient,url,dbName,app) => {
  app.post('/addToGroup',function(req,res) {

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    let userGroupObj = req.body; // User object
    let groupObj = req.body.group; // Contains group object
    let existing = true; // Flag for if existing

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use the USERS collection

      // Check if already in the group
      collection.find({"username": userGroupObj.user, "groups.groupName" : groupObj.groupName}).count((err,count) => {

        // If there are no duplicates
        if (count == 0) {
          collection.updateOne({"username": userGroupObj.user}, {$push: {"groups": groupObj}}).then(() => {
            existing = false;
            res.send(existing);
          });
        }

        // If already in group
        else {
          res.send(existing);
        }
      });
    });
  });
}
