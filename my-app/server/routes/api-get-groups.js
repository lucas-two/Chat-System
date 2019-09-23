module.exports = (db, app) => {
  app.get('/getGroups',function(req,res){

    // Debugging
    console.log('api-get-groups hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    const collection = db.collection('groups');

    // Get all groups
    collection.find({}).toArray((err,doc)=>{
      res.send(doc);
    });
  });
}
