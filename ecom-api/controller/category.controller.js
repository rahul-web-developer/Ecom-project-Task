const CategorySchema = require("../model/category.model")

const createCategory = async (req, res)=>{
   try {
    const newCategory = new CategorySchema(req.body)
    await newCategory.save()
    
    res.status(200).json(newCategory)

   } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
    

   }
}

const fetchCategory = async (req, res)=>{
  try {
    const newCategories = await CategorySchema.find()
    
    res.status(200).json(newCategories)


   } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
    

   }
}


module.exports = {
  createCategory,
  fetchCategory
}