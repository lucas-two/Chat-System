module.exports = (MongoClient,url,dbName,app) => {
  app.post('/updateStatus',function(req,res){

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Store user object (name & status)
    let userObj = req.body;

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use the USERS database

      // Update the status of user
      collection.updateOne({username: userObj.username}, {$set: {status: userObj.status}}, () => {
        res.send({'ok': 1});
      });
    });
  });
}
