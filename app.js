var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');
var port = 8080;

var db = 'mongodb://localhost/example';

//connecting database
mongoose.connect(db);


//code for postman
//app.use(bodyParser.json());             //tells the system that you want json to be used
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
    res.send('happy to be here....!');
});

app.get('/books', function (req, res) {
    console.log('getting all books');
    Book.find({})
        .exec(function (err, books) {
            if (err) {
                res.send('error occured')
            } else {
                console.log(books);
                res.json(books);
            }
        });
});

app.get('/books/:id/:title', function (req, res) {
    console.log('getting one book.', req.params);
    Book.findOne({
        _id: req.params.id,
        title: req.params.title,
        //category:req.params.category
    })
        .exec(function (err, book) {
            if (err) throw err;
            else {
                console.log(book);
                res.json(book);
                console.log('ID:', req.params.id);
                console.log('Title:', req.params.title);
            }
        });
});

//Code for id auto increament
// db.Book.insert(
//     {
//         _id: "userid",
//         seq: 0
//     }
// )


var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
app.post('/book', function (req, res) {
    var newBook = new Book();
    
    var id = add();
    console.log("Id before: "+id);
    newBook._id = id;
     
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    //id++;
    console.log("Id after: "+id);
    newBook.save(function (err, book) {
        if (err) throw err;
        else {
            console.log(book);
            res.send(book);
        }
    });

});

// app.post('/book2', function (req, res) {
//    Book.create(req.body, function (err, book) {
//        if (err) throw err;
//        else {
//            console.log(book);
//            res.send(book);
//        }
//    });
// });

app.put('/book/:id', function (req, res) {
    Book.findOneAndUpdate({
        _id: req.params.id
    }, {
            $set: { title: req.body.title }
        },
        { upsert: true }, function (err, newBook) {
            if (err) throw err;
            else {
                console.log(newBook);
                res.send(newBook);
            }
        });
});

app.delete('/book/:id', function (req, res) {
    Book.findByIdAndRemove({
        _id: req.params.id
    }, function (err, book) {
        if (err) throw err;
        else {
            res.send("data deleted");
        }
    });
});

app.listen(port, () => {
    console.log('server has been started on port' + port);
});
