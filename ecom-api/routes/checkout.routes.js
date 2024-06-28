const express = require("express")
const { createCheckout, refreshCheckout } = require("../controller/checkout.controller")
const router = express.Router()

const sessionMiddleware = require("../middleware/session.middleware")

router.post('/', sessionMiddleware,  createCheckout)
router.post('/refresh', sessionMiddleware,  refreshCheckout)

module.exports = router