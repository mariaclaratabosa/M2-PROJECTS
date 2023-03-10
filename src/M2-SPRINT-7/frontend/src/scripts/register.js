import { registerRequest } from "./requests.js";

const authentication = () => {
    const token = localStorage.getItem("@kenzieempresas:token")
    if(token) {
        window.location.replace('../pages/dashboard.html')
    }
}

const handleRegister = () => {
    const registerUserName = document.querySelector('#register__name')
    const registerEmail = document.querySelector('#register__email')
    const registerPassword = document.querySelector('#register__password')
    const registerLevel = document.querySelector('#professional__level')
    const registerButton = document.querySelector('#register')
    const form = document.querySelector('form')

    registerButton.addEventListener('click', async (event) => {
        if(form.checkValidity()){
            event.preventDefault()
            const registerBody = {
                username: registerUserName.value,
                password: registerPassword.value,
                email: registerEmail.value,
                professional_level: registerLevel.value 
            }
            await registerRequest(registerBody)
        } else {
            console.log('os campos não foram todos preenchidos')
        }
    })
}

const loginRedirect = () => {
    const loginButton = document.querySelector('#register__login')
    loginButton.addEventListener('click', () => {
        setTimeout(() => {
            window.location.replace('../pages/login.html')
        }, 1000)
    })
}

const homeRedirect = () => {
    const homeButtonHeader = document.querySelector('#register__home')
    const homeButonMain = document.querySelector('#return__button')

    homeButtonHeader.addEventListener('click', (event) => {
        event.preventDefault()
        setTimeout(() => {
            window.location.replace('../../index.html')
        }, 1000)
    })
    homeButonMain.addEventListener('click', (event) => {
        event.preventDefault()
        setTimeout(() => {
            window.location.replace('../../index.html')
        }, 1000)
    })
}

const showMenu = () => {
    const menuButton = document.querySelector('.dropdown__menu')
    menuButton.addEventListener('click', () => {
        let headerButtons = document.querySelector('.register__buttons--show')
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
handleRegister()
loginRedirect()
homeRedirect()