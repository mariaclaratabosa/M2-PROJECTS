import { loginRequest, userRequest } from "./requests.js";

const authentication = () => {
    const token = localStorage.getItem("@kenzieempresas:token")
    if(token) {
        window.location.replace('../src/dashboard.html')
    }
}

const handleLogin = () => {
    const emailInput = document.querySelector('#input__email')
    const passwordInput = document.querySelector('#input__password')
    const submitButton = document.querySelector('#login__button')

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const loginBody = {
            email: emailInput.value,
            password: passwordInput.value,
        }
        const token = loginRequest(loginBody)
        if(token){
            await userRequest()
        }
    })
}

const registerRedirect = () => {
    const registerButtonHeader = document.querySelector('#login__register')
    const registerButtonMain = document.querySelector('#register__button') 

    registerButtonHeader.addEventListener('click', (event) => {
        event.preventDefault()
        setTimeout(() => {
            window.location.replace('../pages/register.html')
        }, 1000)
    })
    registerButtonMain.addEventListener('click', (event) => {
        event.preventDefault()
        setTimeout(() => {
            window.location.replace('../pages/register.html')
        }, 1000)
    })
}

const homeRedirect = () => {
    const homeButton = document.querySelector('#login__home')
    homeButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

const showMenu = () => {
    const menuButton = document.querySelector('.dropdown__menu')
    menuButton.addEventListener('click', () => {
        let headerButtons = document.querySelector('.login__buttons--show')
        headerButtons.classList.toggle('show')
        if(headerButtons.classList.contains('show') == true){
            menuButton.src = '../assets/img/close.svg'
        } else {
            menuButton.src = '../assets/img/dropdown-menu.svg'
        }
    })
}

showMenu()
authentication()
handleLogin()
registerRedirect()
homeRedirect()