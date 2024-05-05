var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var loginSchema=new Schema({

    username:{type:String},
    category:{type:String},
    data:{type:String}
});

module.exports=mongoose.model('ToDo',loginSchema,'ToDo');

