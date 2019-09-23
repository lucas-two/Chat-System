module.exports = (db, app) => {
  app.get('/getUsers',function(req,res){

    // Debugging
    console.log('api-get-users hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    const collection = db.collection('users');

    // Get all users
    collection.find({}).toArray((err,doc)=>{
      res.send(doc);
    });
  });
}
