var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var stripe = require('stripe')('sk_test_K0F9HGt7qaooA5NMboTg5IpV');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/',function(req,res){
   res.sendFile(path.join(__dirname ,'index.html')) 
});

app.get('/main.js',function(req,res){
    res.sendFile(path.join(__dirname ,'main.js'));
});
app.get('/main.css',function(req,res){
    res.sendFile(path.join(__dirname ,'main.css'));
});

app.post('/charge',function(req,res){
    const amount = 2500;
    stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: "Example charge",
        source: req.body.stripeToken,
      }, function(err, charge) {
        // asynchronously called
        console.log(charge);
        if(err){
            return res.send('success');
        }
        res.send('transcation successful');
      });
      
});

app.listen(8080,function(){
    console.log('server is running at port 8080');
});