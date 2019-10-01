module.exports = (MongoClient,url,dbName,app) => {
  app.post('/deleteGroup',function(req,res){

    // Debugging
    console.log('api-delete-group hit angular');

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    let groupObj = req.body; // Group object
    let existing = true; // Flag for if existing

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('groups'); // Use the GROUPS collection
      const collectionTwo = db.collection('users'); // And use the USERS collection

      // Check if group exists
      collection.find({"groupName" : groupObj.group}).count((err,count) => {

        // If it does exist
        if (count == 1) {
          // Remove group
          collection.deleteOne({"groupName" : groupObj.group}).then(() => {
            // Remove users from the group
            collectionTwo.updateMany({"groups.groupName" : groupObj.group}, {$pull: {"groups": {"groupName": groupObj.group}}}).then(() => {
              existing = false;
              res.send(existing);
            });
          });
        }

        // If it dose not
        else {
          res.send(existing);
        }
      });
    });
  });
}
