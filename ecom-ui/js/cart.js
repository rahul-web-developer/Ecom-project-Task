axios.defaults.baseURL = server

window.onload = async () => {
  const session = await checkAuth();

  
  if (!session) 
    return window.location.href = "/";

if(session.role === "admin")
  return window.location.href = "/"

  // if user is login run this code
  showCart();
};

// show cart data
const showCart = async () => {
  const cartDataContainer = document.getElementById("cartDataShow");
   cartDataContainer.innerHTML = ""
  try {

    const authToken = localStorage.getItem('auth')

    const options = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const {data} = await axios.get('/cart', options)


      for (const cart of data) {

         const ui = ` <div class="flex gap-6 bg-white border rounded-md p-4" >
                    <img src="${server}/${cart.product.thumbnail}" class="w-[100px]" />
                    <div class="flex-grow">
                        <h1 class="text-lg font-semibold capitalize">${cart.product.title}</h1>
                        <p class="text-gray-600 text-sm">${cart.product.description}</p>
                        <div class="mt-4 flex gap-4 items-center">
                         
                           <h1 class="font-semibold text-lg">₹${cart.product.price-(cart.product.price*cart.product.discount)/100}</h1>


                           <div class="flex gap-2">
                           <del>₹${cart.product.price}</del>
                            <p>₹${(cart.product.discount)}% off</p>
                           </div>
                            <div class="flex items-center">
                                <button class="border border-r-0 border-gray-300 w-[34px] h-[34px] flex items-center justify-center">-</button>
                                <button class="border border-r-0 border-gray-300 w-[34px] h-[34px] flex items-center justify-center">4</button>
                                <button class="border border-gray-300 w-[34px] h-[34px] flex items-center justify-center">-</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="bg-green-500 text-white w-[150px] py-3 rounded mb-4">
                            <i class="ri-shopping-cart-line mr-1"></i>
                            Buy Now
                        </button>

                        <button class="bg-rose-500 text-white w-[150px] py-3 rounded"
                        onclick="removeBtn('${cart._id}')">
                            <i class="ri-delete-bin-6-line mr-1"></i>
                            Remove
                        </button>
                    </div>
                </div>`;


    cartDataContainer.innerHTML += ui;
  }
  } catch (error) {
    console.log(error)
  }

};



// removebtn
const removeBtn = async (id, indxid)=>{
  const authToken = localStorage.getItem('auth')
  const options = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  try {
  const data = await axios.delete(`/cart/${id}`, options)

  showCart()
} catch (error) {
    alert('something went  wrong ')
  }
}