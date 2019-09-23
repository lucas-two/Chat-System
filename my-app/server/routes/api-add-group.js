module.exports = (db, app) => {
  app.post('/createGroup',function(req,res){

    // Debugging
    console.log('api-add-group hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    var existing = true; // Flag for if group already existing
    const groupObj = req.body; // Store the sent user object

    const collection = db.collection('groups');

    collection.find({"groupName" : groupObj.groupName}).count((err,count)=>{

      // If there are no duplicates
      if (count == 0) {
        // Add the group
        collection.insertOne(groupObj, () => {
          existing = false;
          res.send(existing);
        });
      }

      // If there are duplicates
      else {
        res.send(existing);
      }
    });
  });
}
