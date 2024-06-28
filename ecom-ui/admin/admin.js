let quill = null;
let filename = null;

const server = "http://localhost:8080";
axios.defaults.baseURL = server

window.onload = async () => {
  quill = new Quill("#editor", {
    theme: "snow",
  });

  await fetchProducts();

  await fetchPayments();

  await fetchOrder();

  await fetchUsers();
};

const valueget = async (value)=>{
  return await value
}


const onTap = (element) => {
  // Hide all tabs data
  const tabData = document.getElementsByClassName("tab-data");
  for (let el of tabData) {
    el.style.display = "none";
  }

  // then show only active tab data
  const tabContent = document.getElementById(element);
  tabContent.style.display = "block";
};

// closeDrawer
const openDrawer = async () => {
  const drawer = document.getElementById("drawer");
  drawer.style.width = "80%";
  drawer.style.transition = "0.3s";
  drawer.classList.add("p-16");

 await fetchBrand()
 await fetchCategory()
};

// open drawer
const closeDrawer = () => {
  const drawer = document.getElementById("drawer");
  const form = document.getElementById("product-form");
  form.reset();
  quill.root.innerHTML = "";
  drawer.style.width = "0%";
  drawer.style.transition = "0.1s";
  drawer.classList.remove("p-16");
};

// create products
const createProduct = async (e) => {
  e.preventDefault();
  const description = quill.root.innerHTML;
  const form = e.target;
  const formdata = {
    title: form.title.value,
    description: description,
    price: form.price.value,
    discount: form.discount.value,
    category: form.category.value,
    brand: '',
    quantity: form.quantity.value
  };
  try {
    await axios.post("/product", formdata);
    closeDrawer();
    fetchProducts();
    new Swal({
      icon: "success",
      title: "Success",
      text: "Product Added Successfully",
    });
  } catch (err) {
    new Swal({
      icon: "error",
      title: "Failed",
      text: "Unable to create product please try after sometime",
    });
  }
};

// fetch products
const fetchProducts = async () => {
  const productsContainer = document.getElementById("products-container");
  const { data } = await axios.get("/product");
  productsContainer.innerHTML = "";
  for (let product of data) {
    const ui = `
        <div class="shadow-lg bg-white">
            <div class="relative">
                <img class="w-full" src="${
                  product.thumbnail
                    ? "http://localhost:8080/" + product.thumbnail
                    : "/images/products/product-avt.png"
                }" />
                <input onchange="uploadeProductImage(this, '${
                  product._id
                }')" type="file" accept="image/*" class="absolute top-0 left-0 w-full h-full opacity-0" />
            </div>
            <div class="p-4">
                <label class="text-sm text-gray-600 mb-1">May 16, 2024 10:00 Am</label>
                <h1 class="text-lg font-semibold">${product.title}</h1>
                <button class="font-bold text-rose-600 text-sm">${
                  product.brand
                }</button>
                <div class="flex gap-2 mt-1">
                    <h1 class="text-md font-bold">₹${
                      product.price - (product.price * product.discount) / 100
                    }</h1>
                    <del>₹${product.price}</del>
                    <label class="text-gray-600">(${
                      product.discount
                    }% OFF)</label>
                </div>
                <div class="flex items-center gap-3 mt-3">
                    <button class="bg-indigo-100 w-8 h-8 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white">
                        <i class="ri-edit-box-line"></i>
                    </button>

                    <button onclick="deleteProduct('${
                      product._id
                    }')" class="bg-rose-100 w-8 h-8 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white">
                        <i class="ri-delete-bin-3-line"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    productsContainer.innerHTML += ui;
  }
};

// delete product
const deleteProduct = async (id) => {
  try {
    await axios.delete(`/product/${id}`);
    fetchProducts();
  } catch (err) {
    new Swal({
      icon: "error",
      title: "Failed",
      text: "Unable to delete product",
    });
  }
};

// progress bar
const uploadProgress = (progress) => {
  const loaded = progress.loaded / 1024 / 1024;
  const total = progress.total / 1024 / 1024;
  const percent = (loaded * 100) / total;

  // Width increasing
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = percent + "%";

  // showing filesize and loaded
  const loadedEl = document.getElementById("loaded");
  loadedEl.innerHTML = loaded.toFixed(1) + "Mb";

  const totalEl = document.getElementById("total");
  totalEl.innerHTML = total.toFixed(1) + "Mb";

  // showing filename
  const filenameEl = document.getElementById("filename");
  filenameEl.innerHTML = filename;
};

// upload Image
const uploadeProductImage = async (input, id) => {
  try {
    const file = input.files[0];
    const uploader = document.getElementById("uploader");
    uploader.style.display = "block"; // show progress uploade loader
    filename = file.name;
    const formData = new FormData();
    formData.append("fileData", file);
    const { data } = await axios.post("/storage", formData, {
      onUploadProgress: uploadProgress,
    }); // upload image
    await axios.put(`/product/${id}`, { thumbnail: data.filename }); // update image path in product
    fetchProducts();
    uploader.style.display = "none";
  } catch (err) {
    new Swal({
      icon: "error",
      title: "Failed",
      text: "Failed to upload file on server",
    });
  }
};

// fetchpayments
const fetchPayments = async () => {
  try {
    const { data } = await axios.get("/razorpay/payments");
    
    const paymentsTable = document.getElementById("payments-table");
    const noOfPayments = document.getElementById("no-of-payments");
    const totalSalesShow = document.getElementById("totalSales");
    const paymentTax = document.getElementById("payment-tax");
    const totalFee = document.getElementById("total-fee");

    let totalSales = 0;
    let totalFeeRazorpay = 0
    let totalTax = 0
    for (let payment of data.items) {
      totalSales = (totalSales+payment.amount)/100
       totalFeeRazorpay = (totalFeeRazorpay+payment.fee)/100
       totalTax = (totalTax+payment.tax)/100
      const ui = `
            <tr class="border-b">
                <td class="py-3 pl-3">
                    <div class="flex items-center gap-3">
                        <img src="/images/pic.jpg" class="w-12 h-12 rounded-full" />
                        <div class="flex flex-col">
                            <h1 class="font-semibold">${
                              payment.notes.name
                                ? payment.notes.name
                                : payment.email.split("@")[0]
                            }</h1>
                            <small class="text-gray-600">May 21, 2024</small>
                        </div>
                    </div>
                </td>
                <td>${payment.email}</td>
                <td>${payment.contact}</td>
                <td>Electronic city, Phase-2, Bengaluru, Karnatka 560100</td>
            </tr>
            `;
      paymentsTable.innerHTML += ui;
    }
    // console.log('total sales', totalSales)
    totalSalesShow.innerHTML = '₹'+Math.round(totalSales).toLocaleString()
  

    totalFee.innerHTML = '₹'+Math.round(totalFeeRazorpay).toLocaleString()
    paymentTax.innerHTML = '₹'+Math.round(totalTax).toLocaleString()
    noOfPayments.innerHTML = '₹'+data.count;
  } catch (err) {
    console.log(err);
  }
};


const fetchOrder = async ()=>{
  try {
    const {data} = await axios.get('/order')
    const ordersTable = document.getElementById("ordersShow")
         for(let order of data)
       {
           console.log("hi", order)
           const ui = `
               <tr class="border-b">
                    <td class="pr-16">${moment(order.createdAt).format('DD MMM YYYY hh:mm a')}</td>
                     <td class="py-3 pr-16">
                         <div class="flex items-center gap-3">
                             <img src="${server}/${order.product.thumbnail}" class="w-12 h-12" />
                          <div class="flex flex-col">
                                <h1 class="font-semibold capitalize">${order.product.title}</h1>
                               <small class="text-gray-600">id - ${order.product._id}</small>
                           </div>
                       </div>
                   </td>
                     <td class="pr-16">₹${order.price}</td>
                    <td class="pr-16">${order.discount}%</td>
                   <td class="capitalize font-semibold pr-16">${order.user.fullname}</td>
                <td class="pr-16">${order.user.email}</td>
                <td class="pr-16">${order.user.mobile}</td>
                <td class="pr-16">${order.user.address}</td>
                <td>
                    <select class="border border-gray-300 p-2 rounded" onChange="updateStatus(this, '${order._id}')">
                        <option disabled>Created</option>
                        <option value="packaging" ${order.status === "packaging" && 'selected'}>Packaging</option>
                        <option value="dispatched" ${order.status === "dispatched" && 'selected'}>Dispatched</option>
                        </select>
                    </td>
                </tr>
            `
            ordersTable.innerHTML += ui
        }
  } catch (error) {
    console.log(error)
  }

}

const updateStatus = async (select, id)=>{
  try {
      await axios.put(`/order/${id}`, {status: select.value})
      new Swal({
          icon: 'success',
          title: 'Status Updated !'
      })
  }
  catch(err)
  {
      new Swal({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to update status'
      })
  }
}



// brand 
const showcreateBrand = async ()=>{
const brandcreaterBox = document.getElementById("brand-creater")

if(brandcreaterBox.style.display != "block")
  return brandcreaterBox.style.display = "block"

  brandcreaterBox.style.display = "none"




}


const createBrand = async ()=>{
 const brand = document.getElementById("brand")
//  alert(brand.value)

 if(brand.value.length == 0)
  return alert("This field is required")

 try {
   const data = axios.post('/brand', {title: brand.value})
  
   Swal.fire({
    icon: 'success',
    title: 'Brand Created Successfully',
    text: 'success'
   })
   
   brand.value = ""
  
   showcreateBrand()
   fetchBrand()

 } catch (error) {
   Swal.fire({
    icon: 'error',
    title: 'Failed',
    text: error.message
   })

 }

}


// fetchBrand

const fetchBrand = async ()=>{
  try {
const chooseBrand = document.getElementById("choose-brand")
chooseBrand.innerHTML = ""
   const {data} = await axios.get('/brand')

   for (const brand of data) {
     const brandUi = `
                             <option value="${brand.title}">${brand.title}</option>

     `

     chooseBrand.innerHTML += brandUi
   }
  } catch (error) {

    console.log(error)

  }
}



// category
const showcreateCategory = ()=>{
  
  const categorycreaterBox = document.getElementById("category-creater")

if(categorycreaterBox.style.display != "block")
  return categorycreaterBox.style.display = "block"

  categorycreaterBox.style.display = "none"


}


// create category
const createCategory = async ()=>{
  const category = document.getElementById("category")
  //  alert(brand.value)
  
   if(category.value.length == 0)
    return alert("This field is required")
  
   try {
     const data = axios.post('/category', {title: category.value})
    
     Swal.fire({
      icon: 'success',
      title: 'Brand Created Successfully',
      text: 'success'
     })
     
     category.value = ""
     
     showcreateCategory()
     fetchCategory()
  
   } catch (error) {
     Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: error.message
     })
  
   }
}

const fetchCategory = async ()=>{
  try {
    const chooseCategory = document.getElementById("choose-category")
    chooseCategory.innerHTML = ""
       const {data} = await axios.get('/category')
    
       for (const category of data) {
         const categorydUi = `
                                 <option value="${category.title}">${category.title}</option>
    
         `
    
         chooseCategory.innerHTML += categorydUi
       }
      } catch (error) {
    
        console.log(error)
    
      }
}


// fetch users
const fetchUsers = async ()=>{
try {
  const users = document.getElementById("users")
  users.innerHTML = ""
  const {data} = await axios.get('/user')
  
  for (const usersdata of data) {
    const ui = `
     <tr class="border-b">
        <td class="py-3 pl-3">
       <div class="flex items-center gap-3">
    <img src="${usersdata.thumbnail ? server+'/'+usersdata.thumbnail : '/images/pic.jpg'}" class="w-12 h-12 rounded-full" />
      <div class="flex flex-col">
             <h1 class="font-semibold">${usersdata.fullname}</h1>
        <small class="text-gray-600">${moment(usersdata.createdAt).format(' DD MMM YYYY, hh:mm:ss a')}</small>
              </div>
             </div>
            </td>
          <td>${usersdata.email}</td>
         <td>${usersdata.mobile}</td>
      <td>${usersdata.address}</td>
    </tr>
    `

    users.innerHTML += ui
  }


} catch (error) {

  console.log(error)

}

}



