const mongoose = require('mongoose');

const URL = new mongoose.Schema({
   
    url:{
        type:String,
        required:true
    },
    shortedUrl :{
        type:String,
        required:true
    }
}) 

module.exports =  mongoose.model("URL",URL); 