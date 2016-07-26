var express = require("express");
var router = express.Router();
var User = require("./models/user").User;


//router.get("/", function(req,res){
  //res.render("index");
//});

router.get("/", function(req,res){
	res.render("index")
});


router.route("/:id")
.put(function(req, res){
 
  User.findById(req.params.id, function(err, operacion){
  num1= parseInt(req.body.primer);
  num2= parseInt(req.body.segundo);
  var val = req.body.operacion;
  req.session.prim_val = num1;
  req.session.seg_val = num2;
  req.session.ope = val
  switch(val){
   case ' + ':
    var resp = (num1 + num2);
    resp = parseInt(resp);
    User.update({_id: req.params.id}, {

    $set: { primer: req.body.primer, segundo: req.body.segundo, operacion: val, resultado: resp  }

     }, function(err, docs ){
       if(err){
      res.sendStatus(500).json(err);
     }
    req.session.resp = resp;
   
     res.redirect("users");
 });
  break;
      case ' - ':
    var resp = (num1 - num2);
    resp = parseInt(resp);
    User.update({_id: req.params.id}, {

    $set: { primer: req.body.primer, segundo: req.body.segundo, operacion: val, resultado: resp  }

     }, function(err, docs ){
       if(err){
      res.sendStatus(500).json(err);
     }
    req.session.resp = resp;
   
     res.redirect("users");
 });
  break;
   case ' * ':
    var resp = (num1 * num2);
    resp = parseInt(resp);
    User.update({_id: req.params.id}, {

    $set: { primer: req.body.primer, segundo: req.body.segundo, operacion: val, resultado: resp  }

     }, function(err, docs ){
       if(err){
      res.sendStatus(500).json(err);
     }
    req.session.resp = resp;
   
     res.redirect("users");
 });
  break;
   case ' / ':
    var resp = (num1 / num2);
    resp = parseInt(resp);
    User.update({_id: req.params.id}, {

    $set: { primer: req.body.primer, segundo: req.body.segundo, operacion: val, resultado: resp  }

     }, function(err, docs ){
       if(err){
      res.sendStatus(500).json(err);
     }
    req.session.resp = resp;
   
     res.redirect("users");
 });
  break;
   default:
    res.send("no ha escogido ninguna operacion");
  };

 })
});


router.get("/:id/edit", function(req,res){
User.findById(req.params.id, function(err, operacion){
   res.render("edit", {operacion: operacion})
 })
 
});



module.exports = router