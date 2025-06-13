const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    adress:{type:String,required:true},
    items:[{
        title:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
    }]

})
module.exports = mongoose.model('Admin',adminSchema);