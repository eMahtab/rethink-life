var express=require('express');
var app=express();

var db=require('./db.js');
var routes=require('./routes/route.js');

var bodyParser=require('body-parser');

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){res.render('index')});

var port = process.env.PORT || 8080;

app.get('/messages',routes.getMessages);
app.post('/message',routes.addMessage);

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});


