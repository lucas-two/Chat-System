module.exports = (db,app) => {
  app.post('/deleteGroup',function(req,res){

    // Debugging
    console.log('api-delete-group hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    let groupObj = req.body;
    let existing = true; // Flag for if existing

    const collection = db.collection('groups');
    const collectionTwo = db.collection('users');

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
}
