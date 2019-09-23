module.exports = (db, app) => {
  app.post('/updateStatus',function(req,res){

    // Debugging
    console.log('api-update-status hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    // Store user object (name & status)
    let userObj = req.body;

    const collection = db.collection('users');

    // Update the status of user
    collection.updateOne({username: userObj.username}, {$set: {status: userObj.status}}, () => {
      res.send({'ok': 1});
    });
  });
}
