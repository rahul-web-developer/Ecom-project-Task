const express = require("express")
const { createOrder, fetchPayments, webhook } = require("../controller/razorpay.controller")
const router = express.Router()

const sessionMiddleware = require("../middleware/session.middleware")
const adminMiddleware = require("../middleware/admin.middleware")


router.post('/order', sessionMiddleware,   createOrder)

router.get('/payments', adminMiddleware,  fetchPayments)

router.post('/webhook', webhook)


module.exports = router