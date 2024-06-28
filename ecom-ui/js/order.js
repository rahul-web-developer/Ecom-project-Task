axios.defaults.baseURL = server

window.onload = async ()=>{

  const session = await checkAuth()

  if(session == null)
    return window.location.href = "./login.html"

  
if(session.role === "admin")
  return window.location.href = "/"

   fetchUserOrder()

}


const getStatusColor = (status)=>{
if(status === "created")
  return 'bg-indigo-600'

if(status === "dispatched")
  return 'bg-rose-600'

return 'bg-blue-500'
}

const fetchUserOrder = async ()=>{
  try {
    const token = localStorage.getItem('auth')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const ordersBox = document.getElementById("orders-box")

    const {data} = await axios.get('/order/user', options)
  
    console.log(data)
for (const orders of data) {
  const ui = `
  <div class="flex gap-4">
<img class="w-24" src="${server+'/'+orders.product.thumbnail}" />

<div> 
<h1 class="text-lg font-semibold capitalize">${orders.product.title}</h1>
<lable class="text-gray-600">${orders.createdAt} </lable>

<div class="space-x-1 mt-1">

<label class="font-medium text-lg">₹ ${orders.price - (orders.price*orders.discount)/100}</label>

<del>₹ ${orders.price}</del>

<label>(${orders.discount}% off)</label>

</div>

<button class=" mt-2 capitalize text-xs font-medium ${getStatusColor(orders.status)} text-white px-3 py-1  rounded">${orders.status}</button>

</div>

  </div>
  `

  ordersBox.innerHTML += ui
}
      
     


  } catch (error) {
     console.log(error)
  }
}