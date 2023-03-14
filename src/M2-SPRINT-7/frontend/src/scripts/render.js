import { getAllCompanies, getAllSectors, getCompanyBySector, userRequest, getAllDepartments, getCompanyByDepartments, getAllUsers, getUserDepartments, editUserAdmin, usersOutOfWork, dismissUserAdmin, hireUserAdmin, getUserDepartment, getCoworkers } from "./requests.js";
import { editUserAdminModal, deleteUserAdminModal, deleteDepartmentAdmin, editDepartmentAdminModal } from "./modal.js";

export const renderAllCompanies = async () => {
    const companies = await getAllCompanies()
    const companiesList = document.querySelector('.companies__list')
    companiesList.innerHTML = ''

    companies.map((company) => {
        const companyItem = document.createElement('li')
        const companyName = document.createElement('p')
        const companyHour = document.createElement('span')
        const divSector = document.createElement('div')
        const companySector = document.createElement('span')

        companyName.innerText = company.name
        companyHour.innerText = `${company.opening_hours} horas`
        companySector.innerText = company.sectors.description

        companyItem.classList.add('company__item')
        companyName.classList.add('company__name')
        companyHour.classList.add('company__hour')
        divSector.classList.add('div__sector')
        companySector.classList.add('company__sector')

        divSector.appendChild(companySector)
        companyItem.append(companyName, companyHour, divSector)
        companiesList.appendChild(companyItem)
    })
}


export const renderSector = async () => {
    const sectors = await getAllSectors()
    const sectorsSelect = document.querySelector('#choose__sector')

    sectors.forEach((sector) => {
        const sectorsOption = document.createElement('option')
        sectorsOption.innerText = sector.description
        sectorsOption.value = sector.description

        sectorsSelect.appendChild(sectorsOption)
    })

    sectorsSelect.addEventListener('change', async (event) => {
        const selectedSector = event.target.value
        if (selectedSector) {
            const companies = await getCompanyBySector(selectedSector)
            renderCompanyBySector(companies)
        } else {
            renderAllCompanies()
        }
    })
}

const renderCompanyBySector = (item) => {
    const companiesList = document.querySelector('.companies__list')
    companiesList.innerHTML = ''

    item.map((company) => {
        const companyItem = document.createElement('li')
        const companyName = document.createElement('p')
        const companyHour = document.createElement('span')
        const divSector = document.createElement('div')
        const companySector = document.createElement('span')

        companyName.innerText = company.name
        companyHour.innerText = `${company.opening_hours} horas`
        companySector.innerText = company.sectors.description

        companyItem.classList.add('company__item')
        companyName.classList.add('company__name')
        companyHour.classList.add('company__hour')
        divSector.classList.add('div__sector')
        companySector.classList.add('company__sector')

        divSector.appendChild(companySector)
        companyItem.append(companyName, companyHour, divSector)
        companiesList.appendChild(companyItem)
    })
}

export const renderUser = async () => {
    const userInformation = await userRequest()

    const username = document.querySelector('.user__name')
    const userEmail = document.querySelector('.user__email')
    const userLevel = document.querySelector('.user__professional--level')
    const userTypeWork = document.querySelector('.user__work--type')
    const divNoWork = document.querySelector('.user__not--hired')
    const divWork = document.querySelector('.user__hired')

    if (userInformation.department_uuid === null) {
        divNoWork.style.display = 'flex'
        divWork.style.display = 'none'
    } else {
        divWork.style.display = 'flex'
        divNoWork.style.display = 'none'
    }

    username.innerText = userInformation.username
    userEmail.innerText = `Email: ${userInformation.email}`
    const level = userInformation.professional_level
    if (level == null) {
        userLevel.innerText = ''
    } else {
        userLevel.innerText = level[0].toUpperCase() + level.substring(1)
    }
    const type = userInformation.kind_of_work
    if (type == null) {
        userTypeWork.innerText = ''
    } else {
        userTypeWork.innerText = type[0].toUpperCase() + type.substring(1)
    }
    const companyName = document.querySelector('.company__name')

    const departmentUser = await getUserDepartment()
    const findUserDepartment = departmentUser.departments.find((department) => {
        if (department.uuid == userInformation.department_uuid) {
            return department
        }
    })
    companyName.innerText = `${departmentUser.name} - ${findUserDepartment.name}`

    const userCoworkers = await getCoworkers()
    const coworkersList = document.querySelector('.user__coworkers')
    userCoworkers[0].users.forEach((coworker) => {
        if (userInformation.uuid == coworker.uuid) {
            return false
        }
        const coworkerItem = document.createElement('li')
        const coworkerName = document.createElement('span')
        const coworkerLevel = document.createElement('span')

        coworkerName.innerText = coworker.username
        const level = coworker.professional_level
        if (level == null) {
            coworkerLevel.innerText = ''
        } else {
            coworkerLevel.innerText = level[0].toUpperCase() + level.substring(1)
        }

        coworkerItem.classList.add('user__coworker--item')
        coworkerName.classList.add('coworker__name')
        coworkerLevel.classList.add('coworker__level')

        coworkerItem.append(coworkerName, coworkerLevel)
        coworkersList.appendChild(coworkerItem)
    })
}

export const renderAllDepartments = async () => {
    const departments = await getAllDepartments()
    const departmentsList = document.querySelector('.companies__list--departments')
    const modalEdit = document.querySelector('.edit__department--admin')
    const modalDelete = document.querySelector('.delete__department--admin')
    departmentsList.innerHTML = ''

    departments.map((department) => {
        const departmentItem = document.createElement('li')
        const departmentContent = document.createElement('div')
        const departmentName = document.createElement('span')
        const departmentDescription = document.createElement('span')
        const companyName = document.createElement('span')
        const departmentButtons = document.createElement('div')
        const seeDepartment = document.createElement('img')
        const editDepartment = document.createElement('img')
        const deleteDepartment = document.createElement('img')

        departmentName.innerText = department.name
        departmentDescription.innerText = department.description
        companyName.innerText = department.companies.name
        seeDepartment.src = '../assets/img/eye.svg'
        editDepartment.src = '../assets/img/black-pencil.svg'
        deleteDepartment.src = '../assets/img/trash.svg'

        seeDepartment.addEventListener('click', async () => {
            const modal = document.querySelector('.view__department--admin')
            modal.showModal()
            const departmentName = document.querySelector('.view__department--name')
            const departmentDescription = document.querySelector('.departament__description--content')
            const departmentCompanyName = document.querySelector('.department__company--content')
            const selectUser = document.querySelector('#select__user')
            const usersList = document.querySelector('.view__users--list')
            const form = document.querySelector('.select__and--hire')
            const closeModal = document.querySelector('.close__view')

            departmentName.innerText = department.name
            departmentDescription.innerText = department.description
            departmentCompanyName.innerText = department.companies.name


            const usersOutOfWorkView = await usersOutOfWork()

            selectUser.innerHTML = ''
            const firstOption = document.createElement('option')
            firstOption.value = ''
            firstOption.innerText = 'Selecionar usuário'
            selectUser.appendChild(firstOption)
            usersOutOfWorkView.forEach((user) => {
                const selectUserOption = document.createElement('option')
                selectUserOption.innerText = user.username
                selectUserOption.value = user.uuid

                selectUser.appendChild(selectUserOption)
            })
            form.addEventListener('submit', (event) => {
                event.preventDefault()
                hireUserAdmin({
                    user_uuid: selectUser.value,
                    department_uuid: department.uuid
                })
            })
            const usersInCompany = await getAllUsers()

            usersList.innerHTML = ''
            usersInCompany.forEach((user) => {
                if (user.department_uuid == department.uuid) {
                    const userItem = document.createElement('li')
                    const userName = document.createElement('span')
                    const userLevel = document.createElement('span')
                    const userCompany = document.createElement('span')
                    const buttonDiv = document.createElement('div')
                    const userDismiss = document.createElement('button')

                    userName.innerText = user.username
                    const level = user.professional_level
                    if (level == null) {
                        userLevel.innerText = ''
                    } else {
                        userLevel.innerText = level[0].toUpperCase() + level.substring(1)
                    }
                    userCompany.innerText = department.companies.name
                    userDismiss.innerText = 'Desligar'

                    userItem.classList.add('view__user--item')
                    userName.classList.add('view__user--name')
                    userLevel.classList.add('view__user--level')
                    userCompany.classList.add('view__user--company')
                    buttonDiv.classList.add('view__user--button')
                    userDismiss.classList.add('view__user--dismiss')

                    userDismiss.addEventListener('click', () => {
                        dismissUserAdmin(user.uuid)
                    })

                    buttonDiv.appendChild(userDismiss)
                    userItem.append(userName, userLevel, userCompany, buttonDiv)
                    usersList.append(userItem)
                }
            })

            closeModal.addEventListener('click', () => {
                modal.close()
            })
        })


        editDepartment.addEventListener('click', () => {
            const textArea = document.querySelector('#change__description')
            editDepartmentAdminModal(department.uuid)
            textArea.innerText = department.description
            modalEdit.showModal()
        })

        deleteDepartment.addEventListener('click', () => {
            deleteDepartmentAdmin(department.uuid, department.name)
            modalDelete.showModal()
        })

        departmentItem.classList.add('department__item')
        departmentContent.classList.add('department__content')
        departmentName.classList.add('department__name')
        departmentDescription.classList.add('department__description')
        companyName.classList.add('company__name')
        departmentButtons.classList.add('department__div--buttons')
        seeDepartment.classList.add('see__department--button')
        editDepartment.classList.add('edit__department--button')
        deleteDepartment.classList.add('delete__department--button')

        departmentContent.append(departmentName, departmentDescription, companyName)
        departmentButtons.append(seeDepartment, editDepartment, deleteDepartment)
        departmentItem.append(departmentContent, departmentButtons)
        departmentsList.appendChild(departmentItem)
    })
}

const renderCompaniesDepartments = (item) => {
    const departmentsList = document.querySelector('.companies__list--departments')
    departmentsList.innerHTML = ''

    item.map((department) => {
        const departmentItem = document.createElement('li')
        const departmentContent = document.createElement('div')
        const departmentName = document.createElement('span')
        const departmentDescription = document.createElement('span')
        const companyName = document.createElement('span')
        const departmentButtons = document.createElement('div')
        const seeDepartment = document.createElement('img')
        const editDepartment = document.createElement('img')
        const deleteDepartment = document.createElement('img')

        departmentName.innerText = department.name
        departmentDescription.innerText = department.description
        companyName.innerText = department.companies.name
        seeDepartment.src = '../assets/img/eye.svg'
        editDepartment.src = '../assets/img/black-pencil.svg'
        deleteDepartment.src = '../assets/img/trash.svg'

        seeDepartment.addEventListener('click', async () => {
            const modal = document.querySelector('.view__department--admin')
            modal.showModal()
            const departmentName = document.querySelector('.view__department--name')
            const departmentDescription = document.querySelector('.departament__description--content')
            const departmentCompanyName = document.querySelector('.department__company--content')
            const selectUser = document.querySelector('#select__user')
            const usersList = document.querySelector('.view__users--list')
            const form = document.querySelector('.select__and--hire')
            const closeModal = document.querySelector('.close__view')

            departmentName.innerText = department.name
            departmentDescription.innerText = department.description
            departmentCompanyName.innerText = department.companies.name


            const usersOutOfWorkView = await usersOutOfWork()

            selectUser.innerHTML = ''
            const firstOption = document.createElement('option')
            firstOption.value = ''
            firstOption.innerText = 'Selecionar usuário'
            selectUser.appendChild(firstOption)
            usersOutOfWorkView.forEach((user) => {
                const selectUserOption = document.createElement('option')
                selectUserOption.innerText = user.username
                selectUserOption.value = user.uuid

                selectUser.appendChild(selectUserOption)
            })
            form.addEventListener('submit', (event) => {
                event.preventDefault()
                hireUserAdmin({
                    user_uuid: selectUser.value,
                    department_uuid: department.uuid
                })
            })
            const usersInCompany = await getAllUsers()

            usersList.innerHTML = ''
            usersInCompany.forEach((user) => {
                if (user.department_uuid == department.uuid) {
                    const userItem = document.createElement('li')
                    const userName = document.createElement('span')
                    const userLevel = document.createElement('span')
                    const userCompany = document.createElement('span')
                    const buttonDiv = document.createElement('div')
                    const userDismiss = document.createElement('button')

                    userName.innerText = user.username
                    const level = user.professional_level
                    if (level == null) {
                        userLevel.innerText = ''
                    } else {
                        userLevel.innerText = level[0].toUpperCase() + level.substring(1)
                    }
                    userCompany.innerText = department.companies.name
                    userDismiss.innerText = 'Desligar'

                    userItem.classList.add('view__user--item')
                    userName.classList.add('view__user--name')
                    userLevel.classList.add('view__user--level')
                    userCompany.classList.add('view__user--company')
                    buttonDiv.classList.add('view__user--button')
                    userDismiss.classList.add('view__user--dismiss')

                    userDismiss.addEventListener('click', () => {
                        dismissUserAdmin(user.uuid)
                    })

                    buttonDiv.appendChild(userDismiss)
                    userItem.append(userName, userLevel, userCompany, buttonDiv)
                    usersList.append(userItem)
                }
            })

            closeModal.addEventListener('click', () => {
                modal.close()
            })
        })


        editDepartment.addEventListener('click', () => {
            const textArea = document.querySelector('#change__description')
            editDepartmentAdminModal(department.uuid)
            textArea.innerText = department.description
            modalEdit.showModal()
        })

        deleteDepartment.addEventListener('click', () => {
            deleteDepartmentAdmin(department.uuid, department.name)
            modalDelete.showModal()
        })

        departmentItem.classList.add('department__item')
        departmentContent.classList.add('department__content')
        departmentName.classList.add('department__name')
        departmentDescription.classList.add('department__description')
        companyName.classList.add('company__name')
        departmentButtons.classList.add('department__div--buttons')
        seeDepartment.classList.add('see__department--button')
        editDepartment.classList.add('edit__department--button')
        deleteDepartment.classList.add('delete__department--button')

        departmentContent.append(departmentName, departmentDescription, companyName)
        departmentButtons.append(seeDepartment, editDepartment, deleteDepartment)
        departmentItem.append(departmentContent, departmentButtons)
        departmentsList.appendChild(departmentItem)
    })
}

export const adminRenderCompanies = async () => {

    const companies = await getAllCompanies()
    const companiesSelect = document.querySelector('#choose__company')

    companies.forEach((company) => {
        const companiesOption = document.createElement('option')
        companiesOption.innerText = company.name
        companiesOption.value = company.uuid

        companiesSelect.appendChild(companiesOption)
    })

    companiesSelect.addEventListener('change', async (event) => {
        const selectedCompany = event.target.value
        if (selectedCompany) {
            const departments = await getCompanyByDepartments(selectedCompany)
            if (departments.length == 0) {
                const departmentsList = document.querySelector('.companies__list--departments')
                departmentsList.innerHTML = 'Esta empresa ainda não possui departamentos cadastrados'
            } else {
                renderCompaniesDepartments(departments)
            }
        } else {
            renderAllDepartments()
        }
    })
}


export const renderAllDepartmentsUsers = async () => {
    const users = await getAllUsers()
    const departments = await getAllDepartments()
    const usersList = document.querySelector('.registered__users--list')
    const modalEdit = document.querySelector('.edit__user--admin')
    const modalDelete = document.querySelector('.delete__user')
    usersList.innerHTML = ''

    users.forEach((user) => {
        if (user.is_admin) {
            return false
        }
        const userItem = document.createElement('li')
        const userContent = document.createElement('div')
        const userName = document.createElement('p')
        const userLevel = document.createElement('span')
        const userCompany = document.createElement('span')
        const userButtons = document.createElement('div')
        const editUser = document.createElement('img')
        const deleteUser = document.createElement('img')

        userName.innerText = user.username
        const level = user.professional_level
        if (level == null) {
            userLevel.innerText = ''
        } else {
            userLevel.innerText = level[0].toUpperCase() + level.substring(1)
        }
        departments.forEach((department) => {
            if (department.uuid == user.department_uuid) {
                userCompany.innerText = department.companies.name
            }
        })
        editUser.src = '../assets/img/pencil.svg'
        deleteUser.src = '../assets/img/trash.svg'

        editUser.addEventListener('click', () => {
            editUserAdminModal(user.uuid)
            modalEdit.showModal()
        })

        deleteUser.addEventListener('click', () => {
            deleteUserAdminModal(user.uuid, user.username)
            modalDelete.showModal()
        })

        userItem.classList.add('user__item')
        userContent.classList.add('user__content')
        userName.classList.add('user__name')
        userCompany.classList.add('user__company')
        userButtons.classList.add('user__buttons')
        editUser.classList.add('edit__user--admin')
        deleteUser.classList.add('delete__user--button')

        userContent.append(userName, userLevel, userCompany)
        userButtons.append(editUser, deleteUser)
        userItem.append(userContent, userButtons)
        usersList.appendChild(userItem)
    })
}


