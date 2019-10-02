module.exports = (MongoClient,url,dbName,app) => {
  app.post('/deleteChannel',function(req,res){

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    let groupObj = req.body;
    let existing = true; // Flag for if existing

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('groups'); // Use the GROUPS collection
      const collectionTwo = db.collection('users'); // And use the USERS collection

      // Check if channel exists
      collection.find({"groupName": groupObj.group, "channels": groupObj.channel}).count((err,count) => {

        // If it does exist
        if (count == 1) {
          // Remove channel
          collection.updateOne({"groupName" : groupObj.group}, {$pull: {"channels": groupObj.channel}}).then(() => {
            // Remove users from the channel
            collectionTwo.updateMany({"groups.groupName" : groupObj.group}, {$pull: {"groups.$.channels": groupObj.channel}}).then(() => {
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
