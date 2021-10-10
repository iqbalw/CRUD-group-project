const mongoose = require('mongoose');

//Creates the product schema which will be reffered to the in MongoDB database.
const productSchema = new mongoose.Schema({
name:{
 type: String,
 required: true,
 min: 3,
 max: 255,
},
description:{
 type: String,
 required: true,
 max: 1024,
 min: 3
},
price:{
 type: Number,
 required: true,
 min: 0.01,
},


});
module.exports = mongoose.model('Product', productSchema)
