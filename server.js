require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose =  require('mongoose');
const uuid =  require('uuid');  
const URLModel =  require('./Model/Url');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true})); // New

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.set('view engine','ejs');

mongoose.connect(process.env.DB_CONNECTION_STRING,()=>{
    console.log("DB is connected");
})


// to short the original url
app.post('/shortURL',async (req,res)=>{
    console.log("SHORT URL",req.body);
    const urlData = {
        shortedUrl:uuid.v4()+'vs847',
        url:req.body.URL
    }
    if(req.body.URL==null || req.body.URL == undefined ){
        return res.send("url is missing")
    }
    const URl =  await URLModel.create(urlData);
    console.log(urlData);
    
    res.send(`${req.headers.origin}`+"/"+urlData.shortedUrl);

})
//  to get the actual url
app.get('/:shortUrl',async (req,res)=>{
    console.log("short url is called");
    console.log(req.params);
    await URLModel.findOne({shortedUrl:`${req.params.shortUrl}`})
    .then((result) => {
       return res.redirect(result.url);   
    }).catch((err) => {
       return res.status(401).json({
            link:"Not found!"
        });
    });
   
  
});

app.listen(process.env.PORT,()=>{
console.log("port is listening at ", process.env.PORT);
});