module.exports = (MongoClient,url,dbName,app) => {
  app.post('/removeFromChannel',function(req,res){

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    let userGroupObj = req.body; // User object
    let existing = true; // Flag for if existing

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use the USERS collection

      // Check if actually in the channel
      collection.find({"username": userGroupObj.user, "groups.groupName" : userGroupObj.group, "groups.channels" : userGroupObj.channel }).count((err,count) => {

        // If they are in the channel
        if (count == 1) {
          // Remove from channel
          collection.updateOne({"username": userGroupObj.user, "groups.groupName" : userGroupObj.group}, {$pull: {"groups.$.channels": userGroupObj.channel}}).then(() => {
            existing = false;
            res.send(existing);
          });
        }

        // If they are not
        else {
          res.send(existing);
        }
      });
    });
  });
}
