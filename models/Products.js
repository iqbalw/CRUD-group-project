const mongoose = require('mongoose');

//Creates the product schema which will be reffered to the in MongoDB database.
const productSchema = new mongoose.Schema({
name:{
 type: String,
 required: true,
 min: 6,
 max: 255,
},
description:{
 type: String,
 required: true,
 max: 1024,
 min: 6
},
price:{
 type: Number,
 required: true,
 max: 4,
 min: 4
},


});
module.exports = mongoose.model('Product', productSchema)
