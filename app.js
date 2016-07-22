var express = require("express")
var bodyParser = require("body-parser")
var app = express();
var User = require("./models/user").User
var session = require("express-session");

// sirve para usar/leer archivos estaticos(no cambian)
app.use("/estatico",express.static('public'));
app.use("/estatico",express.static('assets'));
app.use(bodyParser.json());//para leer json
app.use(bodyParser.urlencoded({extended: true})); // para leer todo tipo de archivos
app.use(session({
 secret: "aqwrqwefsa2342",
 resave: false,
 saveUninitialized: false
}));
// seteo variable para leer archivos jade
app.set("view engine", "jade");


app.post("/users", function(req,res){
 var num1 = req.body.email;
 var num2 = req.body.password;
 num1 = parseInt(num1);
 num2 =  parseInt(num2);
 var val = req.body.operacion
 req.session.prim_val = num1;
 req.session.seg_val = num2;
 req.session.ope = val;
 switch (val) {
  case ' + ':
    var resp = (num1+num2);
     var user = new User({primer: num1, segundo: num2, operacion: val, resultado: resp });
       user.save(function(){ 
       req.session.resp = resp;
        res.redirect("./users");
       });
    
    break;

  case ' - ':
     var resp = (num1-num2);
     var user = new User({primer: num1, segundo: num2, operacion: val, resultado: resp });
       user.save(function(){
       req.session.resp = resp;
       res.redirect("./users");
       });
       break;

  case ' * ' :
     var resp = (num1*num2);
     var user = new User({primer: num1, segundo: num2, operacion: val, resultado: resp });
       user.save(function(){
       req.session.resp = resp;
        res.redirect("./users");
       });

     break;
  case ' / ' :
      var resp = (num1/num2);
     var user = new User({primer: num1, segundo: num2, operacion: val, resultado: resp });
       user.save(function(){
       req.session.resp = resp;
        res.redirect("./users");
       });    
     break;
  default:
    res.send("No ha escogido ninguna operacion");
     break;
 }
   
});

app.get("/users", function(req,res){
  res.render('users', {primVal:  req.session.prim_val, segval: req.session.seg_val, op: req.session.ope, resultado: req.session.resp});

});

app.get("/", function(req,res){
 res.render("index");
});



app.get("/login", function(req,res){
  User.find(function(err,doc){
  console.log(doc);
  res.render("login");  
  });
  
});

app.get("/resultados", function(req, res){
User.find({}, function(err,docs){
  if(err){
    return res.sendStatus(500).json;
  }
module.exports.docs= docs;
  res.render("resultados", {docs: docs});

 });
});


app.listen(8080);