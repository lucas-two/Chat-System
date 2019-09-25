module.exports = (db,app) => {
  app.post('/deleteChannel',function(req,res){

    // Debugging
    console.log('api-delete-channel hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    let groupObj = req.body;
    let existing = true; // Flag for if existing

    const collection = db.collection('groups');
    const collectionTwo = db.collection('users');

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
}
