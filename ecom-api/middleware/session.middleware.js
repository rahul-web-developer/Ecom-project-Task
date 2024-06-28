const jwt = require("jsonwebtoken")

const sessionMiddleware = async (req, res, next)=>{

  const authorization = req.headers.authorization 

  if(!authorization)
    return res.status(401).send("Unauthorized")

  const [type , token] = authorization.split(" ")

  if(type !== "Bearer" && type !== "checkout")
    return res.status(401).send("Unauthorized")

let secret = null

  if(type == "Bearer")
    secret = process.env.AUTH_SECRET

  if(type == "checkout")
    secret = process.env.CHECKOUT_TOKEN



try {
  
  const user = await jwt.verify(token, secret)

  req.user = user
  
next()
} catch (error) {

  return res.status(401).send("Unauthorized")

}

}

module.exports = sessionMiddleware