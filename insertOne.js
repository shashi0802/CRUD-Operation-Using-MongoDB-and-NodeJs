const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/insertDB';

MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log("Unable to connect to MongoDB");
    }

    else{
        db.collection('User').insertOne({
            _id:4,
            name:"Asmit",
            age : 22,
            location:"Nallasopara"                                           //post
        },(err,result)=>{
            if(err){
                console.log('Unable to insert data ', err);
            }
            console.log(result.ops);
        });
    }

    // db.collection('User').find({_id:1}).toArray().then((docs)=>{
    //     console.log('User');                                                         get
    //     console.log(JSON.stringify(docs,undefined,2));
    //     //console.log(docs);
    // },(err)=>{
    //     console.log("Unable to connect",err);
    // });

    // db.collection('User').find({ name: "Shashikant" }).count().then((count) => {
    //     console.log(`User count : ${count}`);
    //     //console.log(JSON.stringify(docs,undefined,2));
    //     //console.log(docs);
    // }, (err) => {                                                                           put
    //     console.log("Unable to connect", err);
    // });

    //for deletion code is here

    // db.collection('User').deleteMany({ name: 'Shashikant' }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     put
    //     console.log("Unable to connect", err);
    // });

    // db.collection('User').deleteOne({ name: 'Shashi' }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     put
    //     console.log("Unable to connect", err);
    // });

    // db.collection('User').findOneAndDelete({ name: 'Asmit' }).then((result) => {
    //     console.log(result);
    // }, (err) => { 
    //     put
    //     console.log("Unable to connect", err);
    // });

    //here is code for update

    db.collection('User').findOneAndUpdate({name:'Rohit'},{$set:{name:'Shashi'}},
    {$inc:{age:1}},{returnOriginal:false}).then((result)=>{
        console.log(result);
    });

    // db.collection('User').count().findOneAndUpdate({_id},{$set:{_id:{count}}},
    // {$inc:{age:1}},{returnOriginal:false}).then((result)=>{
    //     console.log(result);
    // });


    console.log("Connected to MongoDB server");
    //db.close();
});