const fs = require('fs');

module.exports = (db,app) => {
  app.post('/removeFromChannel',function(req,res){

    // Debugging
    console.log('api-remove-from-channel hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    let userGroupObj = req.body; // User object
    let existing = true; // Flag for if existing

    const collection = db.collection('users');

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
}
