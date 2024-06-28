const express = require("express")
const { addToCart, removeToCart, fetchCart } = require("../controller/cart.controller")
const router = express.Router()
const sessionMiddleware = require("../middleware/session.middleware")

router.get('/', sessionMiddleware, fetchCart)
router.post('/', sessionMiddleware,  addToCart)
router.delete('/:id', sessionMiddleware,  removeToCart)


module.exports = router