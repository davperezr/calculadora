var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/calculadora");
// seteo el esquema de la base de datos
var user_schema = new Schema ({
 primer: Number,
 segundo: Number,
 operacion:String,
 resultado: Number,
 fecha: { type: Date, default: Date.now },
 estado: {type: Boolean, default: true }

});

// creacion de nuevo esquema para mongoose
var User = mongoose.model("User", user_schema);

module.exports.User = User;