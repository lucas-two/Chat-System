// BUG: Does not check if already existing group

module.exports = (db, app) => {
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

    // Add to group
    collection.updateOne({"username": userGroupObj.user}, {$push: {"groups": groupObj}}).then(() => {
      res.send({ok: 1});
    });


    // collection.find({"username": userGroupObj.user}, {"groups": [{"groupName": groupObj.groupName}]}).count((err,count) => {

    //   // If there are no duplicates
    //   if (count == 0) {
    //     console.log("yay");
    //     collection.updateOne({"username": userGroupObj.user}, {$push: {groups: groupObj}}).then(() => {
    //       existing = false;
    //       res.send(existing);
    //     });
    //   }

    //   // If already in group
    //   else {
    //     console.log("nay");
    //     res.send(existing);
    //   }
    // });
  });
}
