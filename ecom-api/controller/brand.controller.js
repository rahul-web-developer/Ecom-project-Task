const BrandSchema = require("../model/brand.model")

const createBrand = async (req, res)=>{
  try {
    const newBrand = new BrandSchema(req.body)
    await newBrand.save()
    res.status(200).json(newBrand)

  } catch (error) {

    res.status(200).json({
      success: false,
      message: error.message
    })
  }

}


const fetchBrand = async (req, res)=>{
  try {
    const brands = await BrandSchema.find()

    res.status(200).json(brands)

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

module.exports = {
  createBrand,
  fetchBrand
}