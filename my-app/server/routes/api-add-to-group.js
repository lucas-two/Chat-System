// BUG: Does not check if already existing group

module.exports = (db,app) => {
  app.post('/addToGroup',function(req,res) {

    // Debugging
    console.log('api-add-to-group hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    let userGroupObj = req.body; // User object
    let groupObj = req.body.group; // Contains group object
    let existing = true; // Flag for if existing

    const collection = db.collection('users');

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
}
