module.exports = (MongoClient,url,dbName,app) => {
  app.post('/addToChannel',function(req,res){

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    let userGroupObj = req.body; // username & groupname & new channel name
    let existing = true; // Flag for if user is already in the group

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use the USERS collection

      // See if already in the channel
      collection.find({"username": userGroupObj.user, "groups.groupName" : userGroupObj.group, "groups.channels" : userGroupObj.channel }).count((err,count) => {

        // If not in the channel already
        if (count == 0) {
          // Add to channel
          collection.updateOne({"username": userGroupObj.user, "groups.groupName" : userGroupObj.group}, {$push: {"groups.$.channels": userGroupObj.channel}}).then(() => {
            existing = false;
            res.send(existing);
          });
        }

        // If already in group
        else {
          console.log("nay");
          res.send(existing);
        }
      });
    });
  });
}
