axios.defaults.baseURL = server

window.onload = ()=>{
    fetchProducts()
    checkAuth()
}

const loginUiDefault = ()=>{
    let menu = document.getElementById("menu")
    const loginUi = `
            <a href="/login.html">Login</a>
            <a href="/signup.html" class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded px-12 py-3 text-white font-semibold">Signup</a>
        `
    menu.innerHTML = loginUi
}

const accountMenu = (session)=>{
    let menu = document.getElementById("menu")
    const ui = `
        <div class="relative" onclick="toggleUserMenu()">
            <img src="/images/pic.jpg" class="w-12 h-12 rounded-full" />
            <div class="bg-white w-[150px] absolute top-14 right-0 shadow-lg py-2 hidden" id="user-menu">
                <h1 class="text-center text-md font-semibold capitalize px-3 py-2">${session.fullname}<h1>
                <p class="text-center text-gray-500">${session.email}</p>
                <hr class="my-4 mx-1" />
                <ul>
                    <li>
                        <a href="/cart.html" class="px-3 py-2 hover:bg-gray-50 w-full flex items-center>
                            <i class="ri-shopping-cart-line mr-2"></i>    
                            Cart
                        </a>
                    </li>

                    <li>
                        <button onclick="logout()" href="#" class="px-3 py-2 hover:bg-gray-50 w-full flex items-center>
                            <i class="ri-logout-circle-r-line mr-2"></i>   
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    `
    menu.innerHTML = ui
}

const checkAuth = async ()=>{
    const session = localStorage.getItem("auth")
    
    if(!session) return loginUiDefault()

    try {
        const {data} = await axios.post('/token/verify', {token: session})
        accountMenu(data)
    }
    catch(err)
    {
        localStorage.removeItem("auth")
        loginUiDefault()
    }
}

const toggleUserMenu = ()=>{
    const userMenu = document.getElementById("user-menu")
    const isHidden = userMenu.classList.contains("hidden")
    if(isHidden)
    {
        userMenu.classList.remove("hidden")
        userMenu.classList.add("block")
    }
    else {
        userMenu.classList.remove("block")
        userMenu.classList.add("hidden") 
    }
}

const logout = ()=>{
    localStorage.clear()
    checkAuth()
}