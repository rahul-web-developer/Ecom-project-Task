const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categoryModel = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  }

}, {timestamps: true})


const CategorySchema = mongoose.model('Category', categoryModel)

module.exports = CategorySchema