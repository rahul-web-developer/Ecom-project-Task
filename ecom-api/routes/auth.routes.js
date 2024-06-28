const express = require("express")
const {login, signup, forgotPassword} = require("../controller/auth.controller")
const router = express.Router()

const roleMiddleware = require("../middleware/role.middleware")

router.post('/login', login)

router.post('/signup', roleMiddleware, signup)

router.post('/forgot-password', forgotPassword)

module.exports = router