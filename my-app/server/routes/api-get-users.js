module.exports = (MongoClient,url,dbName,app) => {
  app.get('/getUsers',function(req,res){

    // Debugging
    console.log('api-get-users hit angular');

    // Error handling
    if (!req.body) {
      return res.sendStatus(400);
    }

    MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {

      // Error handling
      if (err) {
        return console.log(err);
      }

      const db = client.db(dbName); // Define database
      const collection = db.collection('users'); // Use the USERS collection

      // Get all users
      collection.find({}).toArray((err,doc)=>{
        res.send(doc);
      });
    });
  });
}
