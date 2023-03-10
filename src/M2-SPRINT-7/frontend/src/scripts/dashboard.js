import { editUserModal } from "./modal.js"
import { renderUser } from "./render.js"

// const authentication = () => {
//     const token = localStorage.getItem("@kenzieempresas:token")
//     if(!token){
//         window.location.replace('../../index.html')
//     }
// }

const homeRedirect = () => {
    const logoutButton = document.querySelector('#user__logout')
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault()
        setTimeout(() => {
            window.location.replace('../../index.html')
        }, 2000)
        localStorage.clear()
    })
}

// authentication()
homeRedirect()
renderUser()
editUserModal()