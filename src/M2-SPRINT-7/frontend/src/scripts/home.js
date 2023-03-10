import { renderSector, renderAllCompanies } from "./render.js"

const loginRedirect = () => {
    const loginButton = document.querySelector('#home__login')
    loginButton.addEventListener('click', (event) => {
        setTimeout(() => {
            event.preventDefault()
            window.location.replace('./src/pages/login.html')
        }, 1000)
    })
}

const registerRedirect = () => {
    const registerButton = document.querySelector('#home__register')
    registerButton.addEventListener('click', (event) => {
        event.preventDefault()
        setTimeout(() => {
            event.preventDefault()
            window.location.replace('./src/pages/register.html')
        }, 1000)
    })
}


const showMenu = () => {
    const menuButton = document.querySelector('.dropdown__menu')
    menuButton.addEventListener('click', () => {
        let headerButtons = document.querySelector('.home__buttons--show')
        headerButtons.classList.toggle('show')
        if(headerButtons.classList.contains('show') == true){
            menuButton.src = './src/assets/img/close.svg'
        } else {
            menuButton.src = './src/assets/img/dropdown-menu.svg'
        }
    })
}
showMenu()

loginRedirect()
registerRedirect()
renderSector()
renderAllCompanies()