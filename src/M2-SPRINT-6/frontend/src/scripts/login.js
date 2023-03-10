import { loginRequest, userRequest } from "./requests.js";

const authentication = () => {
    const token = localStorage.getItem("@petinfo:token")
    if(token) {
        window.location.replace('./src/pages/dashboard.html')
    }
}
authentication()

const handleLogin = () => {
    const emailInput = document.querySelector('#input--email')
    const passwordInput = document.querySelector('#input--senha')
    const submitButton = document.querySelector('.login--submit')

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const loginBody = {
            email: emailInput.value,
            password: passwordInput.value
        }
        const token = loginRequest (loginBody)
        if(token){
            await userRequest()
        }
    })
}
handleLogin()

const registerRedirect = () => {
    const registerButton = document.querySelector('.register--button__redirect')
    registerButton.addEventListener('click', async () => {
        window.location.replace('./src/pages/register.html')
    })
}
registerRedirect()