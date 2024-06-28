const express = require("express")
const {  fetchAllOrder,
  updateStatus, fetchUserOrder } = require("../controller/order.controller")
const router = express.Router()

const sessionMiddleware = require("../middleware/session.middleware")

const adminMiddleware = require("../middleware/admin.middleware")

router.get('/', adminMiddleware,   fetchAllOrder)
router.get('/user', sessionMiddleware,  fetchUserOrder)
router.put('/:id', adminMiddleware, updateStatus)

module.exports = router