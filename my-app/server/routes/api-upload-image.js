module.exports = (MongoClient,url,dbName,app,formidable) => {
  app.post('/imageUpload',function(req,res){

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

      var form = new formidable.IncomingForm({ uploadDir: './userimages'});
      form.keepExtensions = true;

      // Error handling
      form.on('error', () => {
        throw err;
        res.send({'bad': 1});
      });

      // Keep name
      form.on('fileBegin', (name, file) => {
        file.path = form.uploadDir + "/" + file.name;
      });

      // Upload to db
      // NOT YET FULLY WORKING -----------------------
      // -----  Currently doesn't upload to db properly
      // ----- is set to 'Alice' for debugging purposes
      // ----------------------------------------------
      form.on('file', (field, file) => {
        collection.updateOne({"username": "Alice"}, {$set: {"picture": file}}).then(() => {
          res.send({'filename': file.name, 'size': file.size});
        });
      });

      form.parse(req);
    });
  });
}
