module.exports = (db, app) => {
  app.post('/addUser',function(req,res){

    // Debugging
    console.log('Hit by Angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    const userObj = req.body; // Store the sent user object
    var existing = true; // Flag for wheather user was existing

    const collection = db.collection('users');

    // Is there a duplicate email or username?
    collection.find({"$or": [{"username": userObj.username}, {"email": userObj.email}]}).count((err,count)=>{

      // If there are no duplicates
      if (count == 0) {
        // Add the user
        collection.insertOne(userObj, () => {
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
}
