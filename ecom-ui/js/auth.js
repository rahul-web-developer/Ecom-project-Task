axios.defaults.baseURL = server

const checkAuth =  async ()=>{
  const session = localStorage.getItem('auth')
  if(!session) return null

  try {
    const payload = session.split(".")[1]
    const tokenString = atob(payload)
    const user = JSON.parse(tokenString)
    console.log('user data hai',user)
     const url = (user.role === "admin" ? '/token/verify?iss=admin' : '/token/verify')

    const {data} = await axios.post(url, {token: session})

   return data


  } catch (error) {
   return null
  }
}  