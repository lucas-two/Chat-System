module.exports = (MongoClient,url,dbName,app) => {
  app.get('/getGroups',function(req,res){

    // Debugging
    console.log('api-get-groups hit angular');

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
      const collection = db.collection('groups'); // Use the GROUPS collection

      // Get all groups
      collection.find({}).toArray((err,doc)=>{
        res.send(doc);
      });
    });
  });
}
