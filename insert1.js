var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var port = 8080;
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var db;

app.use(bodyParser.urlencoded({
    extended: true
}));

const url = 'mongodb://localhost:27017/FinalDB';
MongoClient.connect(url, (err, database) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db = database;
    //    console.log("----------------- " + db);
    // db.close();
});

app.get('/book', (req, res) => {
    db.collection('Users').find({}).toArray((err, docs) => {
        console.log(docs);
        if(err) throw err
        res.send(docs);
    });
});


app.post('/book', (req, res) => {
    db.collection('Users').find().count().then((count) => {
        console.log(`Database count.........${count + 1}`);
        db.collection('Users').insertOne({
            id: count + 1,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category
        }, (err, docs) => {
            if (err) throw err;
            res.send(docs);
        });
    });
});

app.put("/book/:id", (req, res) => {
    db.collection('Users').findOneAndUpdate({ _id: new ObjectID(req.params.id) },
        {
            $set: { author: req.body.author }
        }, {
            returnOriginal: false
        }).then((result) => {
            res.send(result);
        });

});


app.delete("/book/:id", (req, res) => {
    db.collection('Users').findOneAndDelete({ _id: new ObjectID(req.params.id) },
        {
            $set: { author: req.body.author }
        }, {
            returnOriginal: false
        }).then((result) => {
            res.send(result);
        });

});

//this for port
app.listen(port, () => {
    console.log("Program running on Port " + port);
});