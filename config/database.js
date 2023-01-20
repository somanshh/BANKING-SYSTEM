const mongoose = require('mongoose');


exports.connectDatabase = ()=>{
    mongoose.connect("mongodb+srv://somansh:9992292792@cluster0.yuvzwjm.mongodb.net/?retryWrites=true&w=majority")
    .then(con=>console.log("working"))
    .catch((error)=>console.log(error));
}
