import { editUser, getAllCompanies, createDepartment, editUserAdmin, deleteUserAdmin, deleteDepartment, editDepartmentAdmin, usersOutOfWork, hireUserAdmin, dismissUserAdmin } from "./requests.js";
import { renderAllDepartments, renderAllDepartmentsUsers } from './render.js'

export const editUserModal = () => {
    const modal = document.querySelector('.edit__user')
    const editButton = document.querySelector('.user__edit')
    const form = document.querySelector('.edit__user--info')
    const inputs = document.querySelectorAll('.input--edit__user')
    const editClose = document.querySelector('.edit__user--close')

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const username = inputs[0].value 
        const email = inputs[1].value
        const password = inputs[2].value

        editUser({
            username,
            password, 
            email,
        })
    })
    editClose.addEventListener('click', () => {
        modal.close()
    })
    editButton.addEventListener('click', () => {
        modal.showModal()
    })
}

export const createDepartmentModal = () => {
    const modal = document.querySelector('.create__department')
    const closeButton = document.querySelector('.close__creation')
    const createButton = document.querySelector('.create__company--button')
    const form = document.querySelector('.create__department--form')
    const inputs = document.querySelectorAll('.create__department--input')
    const select = document.querySelector('#select__company')

    createButton.addEventListener('click', async () => {
        const companies = await getAllCompanies()
        companies.forEach((company) => {
            const option = document.createElement('option')
            option.innerText = company.name
            option.value = company.uuid
            select.appendChild(option)
        })
        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            await createDepartment({
                name: inputs[0].value,
                description: inputs[1].value,
                company_uuid: select.value,
            })
        })
        closeButton.addEventListener('click', () => {
            modal.close()
        })
            modal.showModal()
    })
}

export const editUserAdminModal = (id) => {
    const modal = document.querySelector('.edit__user--admin')
    const closeButton = document.querySelector('.close__edition')
    const form = document.querySelector('.edit__user--form')
    const selectWork = document.querySelector('#edit__typeOf--work')
    const selectLevel = document.querySelector('#edit__professional--level')

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        
        await editUserAdmin(id, {
            kind_of_work: selectWork.value,
            professional_level: selectLevel.value
        })
        renderAllDepartmentsUsers()
    })
    closeButton.addEventListener('click', () => {
        modal.close()
    })
}

export const editDepartmentAdminModal = (id) => {
    const modal = document.querySelector('.edit__department--admin')
    const closeButton = document.querySelector('.close__edit')
    const form = document.querySelector('.edit__department--form')
    const textArea = document.querySelector('#change__description')

    form.addEventListener('submit', async(event) => {
        event.preventDefault()

        await editDepartmentAdmin(id, {
            description: textArea.value
        })
        renderAllDepartments()
    })
    closeButton.addEventListener('click', () => {
        modal.close()
    })
}

export const deleteUserAdminModal = (id, username) => {
    const modal = document.querySelector('.delete__user')
    const closeDelete = document.querySelector('.delete__close')
    const deleteMessage = document.querySelector('.delete__message')
    const deleteConfirm = document.querySelector('.delete__confirm')

    deleteMessage.innerText = `Realmente deseja remover o usuário ${username}?`

    deleteConfirm.addEventListener('click', async () => {
        await deleteUserAdmin(id)
        renderAllDepartmentsUsers()
    })
    closeDelete.addEventListener('click', () => {
        modal.close()
    })
}

export const deleteDepartmentAdmin = (id, departmentName) => {
    const modal = document.querySelector('.delete__department--admin')
    const closeDelete = document.querySelector('.delete__department--close')
    const deleteMessage = document.querySelector('.delete__department--message')
    const deleteConfirm = document.querySelector('.delete__department--confirm')

    deleteMessage.innerText = `Realmente deseja deletar o Departamento ${departmentName} e demitir seus funcionários?`

    deleteConfirm.addEventListener('click', async () => {
        await deleteDepartment(id)
        renderAllDepartments()
    })
    closeDelete.addEventListener('click', () => {
        modal.close()
    })
}

