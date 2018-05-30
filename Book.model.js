//This is model part.....

var mongoose = require('mongoose');

//here I define a Schema
var Schema = mongoose.Schema;

// here i set the key value pair in the schema
var BookSchema = new Schema({
    _id: Number,
    title: String,
    author: String,
    category: String
});

//Export function creating "Book" model class.
module.exports = mongoose.model('Book', BookSchema);
