
const express = require("express")
const { fetchCategory, createCategory } = require("../controller/category.controller")
const router = express.Router()

const adminMiddleware = require("../middleware/admin.middleware")

router.post('/', adminMiddleware,  createCategory)

router.get('/', fetchCategory)

module.exports = router