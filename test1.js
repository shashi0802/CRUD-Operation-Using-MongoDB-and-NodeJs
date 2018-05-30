const exress = require('express');
const MongoClient = require('mongodb').MongoClient;
const test = require('assert');

const bodyParser = require('body-parser');
var port = 8080;
var app = exress();

app.use(bodyParser.urlencoded({
    extended: true
}));

// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  // Create a collection we want to drop later
  const col = client.db(dbName).collection('listCollectionsExample1');
  // Insert a bunch of documents
//   col.insert([{a:1, b:1}
//     , {a:2, b:2}, {a:3, b:3}
//     , {a:4, b:4}], {w:1}, function(err, result) {
//     test.equal(null, err);
    // List the database collections available
    // db.listCollections().toArray(function(err, items) {
    //   test.equal(null, err);
    //   client.close();
    // });
  //});
 //console.log(col);
});

app.get("/",(req,res)=>{
    res.send('Welcome on get call');
});

app.post('/book',(req,res)=>{
    col._id = 1,
    col.title = req.body.title,
    col.author = req.body.author,
    col.category = req.body.category
    col.save((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.listen(port,()=>{
    console.log("Code running on port "+port);
})