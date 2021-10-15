const { boolean } = require("@hapi/joi");
const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: function () { return this.type === 'local' },
    max: 1024,
    min: 6,
  },
  type: {
    type: String,
    required: true,
    enum: ['local', 'google']

  },
  cart: [{
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: 'Number',
      required: true
    }
  }],
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
