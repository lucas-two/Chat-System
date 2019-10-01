module.exports = (MongoClient,url,dbName,app) => {
  app.post('/createGroup',function(req,res){

    // Debugging
    console.log('api-add-group hit angular');

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    var existing = true; // Flag for if group already existing
    const groupObj = req.body; // Store the sent user object

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('groups'); // Use the GROUPS collection

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
  });
}
