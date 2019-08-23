module.exports = function(http){
    const server = http.listen(3000, () =>{
    let port = server.address().port;
    console.log(`Listening on port ${port}...`);
  });
}
