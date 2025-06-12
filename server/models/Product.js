const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    image:{type:String,required:true,default:''},
    title:{type:String,required:true},
    price:{type:Number,required:true,min:0},
    category:{type:Number,required:true},
    quantity:{type:Number,required:true,min:1}

})
module.exports = mongoose.model('Product', productSchema);