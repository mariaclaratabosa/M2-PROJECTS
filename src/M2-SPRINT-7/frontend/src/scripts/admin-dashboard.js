import { adminRenderCompanies, renderAllDepartmentsUsers, renderAllDepartments } from "./render.js";
import { createDepartmentModal } from "./modal.js";

const authentication = () => {
    const token = localStorage.getItem("@kenzieempresas: token")
    if(!token){
        window.location.replace('../../index.html')
    }
}

const homeRedirect = () => {
    const logoutButton = document.querySelector('#admin__logout')
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault()
        setTimeout(() => {
            window.location.replace('../../index.html')
        }, 2000)
        localStorage.clear()
    })
}


authentication()
homeRedirect()
adminRenderCompanies()
renderAllDepartmentsUsers()
renderAllDepartments()
createDepartmentModal()
