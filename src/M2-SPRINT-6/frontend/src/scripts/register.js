import { registerRequest } from "./requests.js"
import { toast } from "./toast.js"

const handleRegister = () => {
    const registerUserName = document.querySelector('#register--username')
    const registerEmail = document.querySelector('.register--emailcontent')
    const registerPhoto = document.querySelector('.register--photo__link')
    const registerPassword = document.querySelector('.register--passwordcontent')
    const registerButton = document.querySelector('.register--button')
    const form = document.querySelector('form')

    registerButton.addEventListener('click', async (event) => {
        if(form.checkValidity()){
            event.preventDefault()
            const registerBody = {
                username: registerUserName.value,
                email: registerEmail.value,
                password: registerPassword.value,
                avatar: registerPhoto.value
            }
            await registerRequest(registerBody)
        } else {
            toast('Os campos não foram todos preenchidos', 'Por favor, preencha os campos que faltam')
        }
    })
}
handleRegister()

const loginRedirect = () => {
    const loginButtons = document.querySelectorAll('.login--button')
    loginButtons.forEach((loginButton) => {
        loginButton.addEventListener('click', async (event) => {
            event.preventDefault()
            setTimeout(() => {
                window.location.replace('../../index.html')
            }, 1000)
        })
    })
}
loginRedirect()

const registerRedirect = () => {
    const registerButton = document.querySelector('.register--button')
    const inputs = document.querySelectorAll('input')
    registerButton.addEventListener('click', async () => {
        inputs.forEach((input) => {
            if(input != ''){
                setTimeout(() => {
                    window.location.replace('../../index.html')
                }, 3000)
            }
        })
    })
}
registerRedirect()

const authentication = () => {
    const token = localStorage.getItem("@petinfo:token")
    if(token) {
        window.location.replace('./dashbboard.html')
    }
}
authentication()