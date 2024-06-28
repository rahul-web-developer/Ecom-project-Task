const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartModel = new Schema({
user: {
type: mongoose.Types.ObjectId,
ref: 'User',
required: true,
},  

product: {
  type: mongoose.Types.ObjectId,
  ref: 'Product',
  required: true
},
quantity: {
  type: Number,
  default: 1
}

}, {timestamps: true})

const CartSchema = mongoose.model("Cart", cartModel)

module.exports = CartSchema