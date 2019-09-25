module.exports = (db,app) => {
  app.post('/removeFromGroup',function(req,res){

    // Debugging
    console.log('api-remove-from-group hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }
    let userGroupObj = req.body; // User object
    let existing = true; // Flag for if existing

    const collection = db.collection('users');

    // Check if actually in the group
    collection.find({"username": userGroupObj.user, "groups.groupName" : userGroupObj.group}).count((err,count) => {

      // If they are in the group
      if (count == 1) {
        // Remove from group
        collection.updateOne({"username": userGroupObj.user}, {$pull: {"groups": {"groupName": userGroupObj.group}}}).then(() => {
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
