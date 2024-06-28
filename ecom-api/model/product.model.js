const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    thumbnail: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:  {
        type: String,
        required: true,
        trim: true
    },
    brand:  {
        type: String,
        trim: true,
        default: 'other',
    },
    price:  {
        type: Number,
        required: true,
        trim: true
    },
    discount:  {
        type: Number,
        required: true,
        trim: true
    },
    category:  {
        type: String,
        trim: true,
        default: 'other',
    },
    quantity:  {
        type: Number,
        required: true,
        trim: true
    },
}, {timestamps: true})

const productModel = mongoose.model("Product", productSchema)
module.exports = productModel
