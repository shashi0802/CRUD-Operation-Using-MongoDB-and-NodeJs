const exress = require('express');
const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');
const bodyParser = require('body-parser');
var port = 8080;
var app = exress();

app.use(bodyParser.urlencoded({
    extended: true
}));

// Connection URL
const url = 'mongodb://localhost:27017/myProjectTwo';

var db

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('myProjectTwo') // whatever your database name is
    const col = db.collection('BooksData');     //collection created
    app.listen(port, () => {
        console.log('listening on ' + port);
    })
})

app.get('/', (req, res) => {
    res.send("Hi happy to mongodb");
});

app.get('/book', function (req, res) {
    console.log('getting all books');
    db.collection('Books').find({})
        .exec(function (err, books) {
            if (err) {
                res.send('error occured')
            } else {
                console.log(books);
                res.json(books);
            }
        });
});
var add = (function () {
    var counter = 0;
    return function () { return counter += 1; }
})();
var id;
app.post('/book', (req, res) => {  
             id = add();
            _id = 1,
            title = req.body.title,
            author = req.body.author,
            category = req.body.category
    db.collection('Books').save(req.body, (err, result) => {
        if (err) return console.log(err);
        res.send(result);
        console.log(result);
        console.log('saved to database ');
    });
});