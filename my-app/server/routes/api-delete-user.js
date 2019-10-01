module.exports = (MongoClient,url,dbName,app) => {
  app.post('/deleteUser',function(req,res){

    // Debugging
    console.log('api-delete-user hit angular');

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    const userToDelete = req.body; // User object to be deleted

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use the USERS collection

      // Delete user
      collection.deleteOne(userToDelete, () => {
        res.send({ok:1});
      });
    });
  });
}
