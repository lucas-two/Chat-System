module.exports = (db, app) => {
  app.post('/addToChannel',function(req,res){

    // Debugging
    console.log('api-add-to-channel hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    let userGroupObj = req.body; // username & groupname & new channel name
    let existing = true; // Flag for if user is already in the group

    const collection = db.collection('users');

    collection.find({"username": userGroupObj.user, "groups": [{"groupName": userGroupObj.group, "channels": [userGroupObj.channel]}]}).count((err,count) => {

      // If not in the channel already
      if (count == 0) {
        console.log("yay");
        collection.updateOne({"username" : userGroupObj.user, "groups.groupName" : userGroupObj.group}, {$addToSet : { "groups.channels" : userGroupObj.channel}}).then(() => {
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
}
