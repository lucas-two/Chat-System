module.exports = (db,formidable,app) => {
  app.post('/imageUpload',function(req,res){

    // Debugging
    console.log('api-image-upload hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    const collection = db.collection('users');



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
    form.on('file', (field, file) => {
      collection.updateOne({"username": "Alice"}, {$set: {"picture": file}}).then(() => {
        res.send({'filename': file.name, 'size': file.size});
      });
    });

    form.parse(req);
  });
}
