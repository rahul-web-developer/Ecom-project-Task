const mongoose = require("mongoose")
const Schema = mongoose.Schema

const brandModel = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  }

}, {timestamps: true})


const BrandSchema = mongoose.model('Brand', brandModel)

module.exports = BrandSchema