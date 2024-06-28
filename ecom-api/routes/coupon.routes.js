
const express = require("express")
const {createCoupon, expireCoupon, fetchCoupon} = require("../controller/coupon.controller")
const router = express.Router()
const sessionMiddleware = require("../middleware/session.middleware")

const adminMiddleware = require("../middleware/session.middleware")

router.get('/:code', sessionMiddleware,  fetchCoupon)
router.post('/', adminMiddleware, createCoupon)
router.delete('/:id', adminMiddleware,  expireCoupon)

module.exports = router