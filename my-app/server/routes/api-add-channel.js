module.exports = (MongoClient,url,dbName,app) => {
  app.post('/createChannel',function(req,res){

    // Debugging
    console.log('api-add-channel hit angular');

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    var existing = true; // Flag for if group already existing
    const channelObj = req.body; // Store the sent user object

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('groups'); // Use the GROUPS collection

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
  });
}
