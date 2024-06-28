axios.defaults.baseURL = server

window.onload = async ()=>{
    const session = await checkAuth()
     console.log('session',session)
    
    if(session)
    return window.location.href = "/"
}

window.onstorage = (e)=>{
 if(e.storageArea == localStorage){

     const ___as = localStorage.getItem('___as')
     if(___as !== null)
     handle___as(___as)

 }
 }


const signup = async (e)=>{
    e.preventDefault()
    const form = e.target
    const payload = {
        fullname: form.fullname.value,
        email: form.email.value,
        password: form.password.value,
        mobile: form.mobile.value,
        address : form.address.value
    }
    try {
        const options = {
            headers: {
                ['X-Auth-Role'] : (form.AN ? form.AN.value : null)
            }
        }
        
        const {data} = await axios.post('/auth/signup', payload, options)

         localStorage.setItem('auth', data.token)

        window.location.href = "/"
    }
    catch(err)
    {
        console.log(err)
    }
}


// handle admin

const handle___as = async (___as)=>{

   
    try {
      const {data} = await  axios.post('/token/verify?iss=admin', {token: ___as})

     const signupform = document.getElementById('signupform')
     const input = document.createElement("input")
     input.placeholder = "admin enter"
     input.name = "AN"
     input.className = 'border w-full border-gray-300 p-2 rounded'
     input.value = ___as
     input.readOnly = true
     input.disabled = true
     signupform.innerHTML = ""
    signupform.append(input)

        
    } catch (error) {
    }  
  }

  