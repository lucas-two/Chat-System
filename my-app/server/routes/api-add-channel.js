module.exports = (db, app) => {
  app.post('/createChannel',function(req,res){

    // Debugging
    console.log('api-add-channel hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    var existing = true; // Flag for if group already existing
    const channelObj = req.body; // Store the sent user object

    const collection = db.collection('groups');

    // Check if channel already exists
    collection.find({"groupName": channelObj.group}, {"channels": [channelObj.channel]}).count((err,count)=>{

      // If there are no duplicates
      if (count == 1) {
        // Create channel
        collection.updateOne({"groupName" : channelObj.group}, {$push: {"channels": channelObj.channel}}).then(() => {
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
