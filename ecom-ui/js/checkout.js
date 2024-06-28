axios.defaults.baseURL = server
let product = null
let checkoutToken = null
let session = null

window.onload = async ()=>{
     session = await checkAuth()

    if(session == null)
        return location.href = "./login.html"

    await validateCheckout()
}   

const validateCheckout = async ()=>{
    const queryString = location.href.split("?")[1]
    const [key, value] = queryString.split("=")
    
    if(key !== "token")
    {
        localStorage.clear()
        location.href = "/login.html"
        return;
    }

    try {

        const {data} = await axios.post('/token/verify?iss=checkout', {token: value})
        product = data
        checkoutToken = value
        setProductInfo()
    }
    catch(err)
    {
        localStorage.clear()
        location.href = "/login.html"
    }
}


const setProductInfo = ()=>{
    const imgcheckout = document.getElementById("imgcheckout")
    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const price = document.getElementById("price")
    const discount = document.getElementById("discount")
    const total = document.getElementById("total")
    title.innerHTML = product.title
    imgcheckout.src  = server+'/'+product.thumbnail
    description.innerHTML = product.description.slice(0,100)
    price.innerHTML = '₹'+product.price
    discount.innerHTML = product.discount+'%'
    total.innerHTML = '₹'+Number(product.price - (product.price*product.discount)/100)
}

const applyCoupon = async (e)=>{
    const coupon = document.getElementById("coupon")
    try {
        e.preventDefault()
        const session = localStorage.getItem("auth")

        const options = {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }
        const {data} = await axios.get(`/coupon/${coupon.value}`, options)
        product = {
            ...product,
            discount: data.discount,
            coupon: data._id
        }
        setProductInfo()
    }
    catch(err)
    {
        coupon.style.borderColor = "deeppink"
        coupon.style.borderWidth = "2px"
        coupon.style.color = "deeppink"
        coupon.value = "Invalid coupon code"

        coupon.onclick = ()=>{
            coupon.style.border = "1px solid #ccc"
            coupon.style.color = "inherit"
            coupon.value = ""
        }
    }
}

// refresh checkout token
const refreshCheckOutToken = async ()=>{
try {
    
    const options = {
        headers: {
            Authorization: `checkout ${checkoutToken}`
        }
    }

    const {data} = await axios.post('/checkout/refresh', product, options)

   return data.token
    

} catch (error) {
    localStorage.clear()
    location.href = "/login.html"
}
}



const buyNow = async ()=>{
    try {
        if(product.coupon)
    checkoutToken = await refreshCheckOutToken() 

        const options = {
            headers: {
                Authorization: `checkout ${checkoutToken}`
            }
        }

        const {data} = await axios.post('/razorpay/order', {}, options)

        const razoroptions = {
            key : razorpaykey,
            order_id: data.orderId,
            amount: data.amount,
            description: 'red shirt',
            name: appName,
            image: 'https://png.pngtree.com/element_pic/00/16/07/06577d261edb9ec.jpg',
    prefill: { 
        email: session.email,
    },
    notes: {
    name: session.fullname,
     user: session.uid,
     product: product._id,
     price: product.price,
     discount: product.discount
    },
    handler: function(response){
        window.location.href = "./order.html"

    }

  }


   const rzp = new Razorpay(razoroptions)
   rzp.open()
                  
    } catch (error) {
        console.log(error)
    }
}