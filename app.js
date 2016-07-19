var express = require("express")
var bodyParser = require("body-parser")
var app = express();

// sirve para usar/leer archivos estaticos(no cambian)

app.use("/estatico",express.static('public'));
app.use("/estatico",express.static('assets'));
app.use(bodyParser.json());//para leer json
app.use(bodyParser.urlencoded({extended: true})); // para leer todo tipo de archivos
// seteo variable para leer archivos jade
app.set("view engine", "jade");

app.post("/users", function(req,res){
 var num1 = req.body.email;
 var num2 = req.body.password;
 num1 = parseInt(num1);
 num2 =  parseInt(num2);

 var val = req.body.operacion
 if(val === "sumar")
 res.send("El resultado es " + (num1 + num2));
 
  if(val === "restar")
 res.send("El resultado es " + (num1 - num2));
 
 if(val === "multiplicar")
 res.send("El resultado es " + (num1 * num2));
 
  if(val === "dividir")
 res.send("El resultado es " + (num1 / num2));
  
})

app.get("/", function(req,res){
 res.render("index");
});

app.get("/login", function(req,res){
  res.render("login");
});



app.listen(8080);