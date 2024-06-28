const  UserSchema = require("../model/user.model")

const fetchUsers = async (req, res)=>{
try {
  
  const users = await UserSchema.find({}, {password: 0, role: 0})

  res.status(200).json(users)


} catch (error) {

  res.status(500).json({
    success: false,
    message: error.message
  })

}

}


module.exports = {
  fetchUsers
}