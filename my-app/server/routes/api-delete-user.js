module.exports = (db,app) => {
  app.post('/deleteUser',function(req,res){

    // Debugging
    console.log('api-delete-user hit angular');
    if (!req.body) {
      return res.sendStatus(400);
    }

    const userToDelete = req.body; // User object to be deleted

    const collection = db.collection('users');

    // Delete user
    collection.deleteOne(userToDelete, () => {
      res.send({ok:1});
    });
  });
}
