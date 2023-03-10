import { toast } from './toast.js'
import { renderUser } from './render.js'

const token = JSON.parse(localStorage.getItem("@kenzieempresas: token")) || ""
const baseURL = "http://localhost:6278"

export const registerRequest = async (registerBody) => {
    const newUser = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerBody)
    })
        .then((response) => {
            if (response.ok) {
                toast('Usuário criado com sucesso', '#4BA036')
                setTimeout(() => {
                    window.location.replace('../pages/login.html')
                }, 2000)
            } else {
                toast('Não foi possível criar usuário', '#CE4646')
            }
        })
    return newUser
}

export const validateUser = (token) => {
    const admin = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    fetch(`${baseURL}/auth/validate_user`, admin)
        .then(response => response.json())
        .then(responseJSON => {
            const tokenBody = {
                token: token,
                is_admin: responseJSON.is_admin
            }
            localStorage.setItem("@kenzieempresas:admin", JSON.stringify(tokenBody))
            setTimeout(() => {
                if (responseJSON.is_admin) {
                    window.location.replace('../pages/admin-dashboard.html')
                } else {
                    window.location.replace('../pages/dashboard.html')
                }
            }, 1500)
        })
}

export const loginRequest = async (loginBody) => {
    const token = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginBody)
    })
        .then((response) => {
            if (response.ok) {
                return response.json().then(({ token }) => {
                    localStorage.setItem("@kenzieempresas: token", JSON.stringify(token))
                    return token
                })
                    .then(token => {
                        validateUser(token)
                        return token
                    })
            } else {
                toast('Email ou senha inválidos', '#CE4646')
            }
        })
    return token
}

export const getAllCompanies = async () => {
    const allCompanies = await fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer null"
        }
    })
        .then((response) => response.json())
    return allCompanies
}

export const getCompanyBySector = async (sector) => {
    const sectorName = await fetch(`${baseURL}/companies/${sector}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer null"
        }
    })
        .then((response) => response.json())
    return sectorName
}

export const getAllSectors = async () => {
    const allSectors = await fetch(`${baseURL}/sectors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer null"
        }
    })
        .then((response) => response.json())
    return allSectors
}

export const userRequest = async () => {
    const userData = await fetch(`${baseURL}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
    return userData
}

export const getCoworkers = async () => {
    const coworkers = await fetch(`${baseURL}/users/departments/coworkers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
    return coworkers
}

export const getLoggedDepartments = async () => {
    const departments = await fetch(`${baseURL}/departments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
    return departments
}

export const editUser = async (userBody) => {
    const user = await fetch(`${baseURL}/users`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userBody)
    })
        .then((response) => {
            if (response.ok) {
                toast('Dados alterados com sucesso', '#4BA036')
                const modal = document.querySelector('.edit__user')
                modal.close()
                renderUser()
            } else {
                toast('Não foi possível alterar dados', '#CE4646')
            }
        })
    return user
}

export const getCompanyByDepartments = async (id)=>{
    const departments_company = await fetch(`${baseURL}/departments/${id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response)=> response.json())
    return departments_company
}

export const getAllDepartments = async () => {
    const departments = await fetch(`${baseURL}/departments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>  response.json())
    return departments
}

export const getUserDepartments = async (id) => {
    const departments = await fetch(`${baseURL}/users/departments/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => response.json())
    return departments
}

export const getUserDepartment = async () => {
    const departments = await fetch(`${baseURL}/users/departments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => response.json())
    return departments
}

export const createDepartment = async (departmentBody) => {
    const department = await fetch(`${baseURL}/departments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(departmentBody)
    })
        .then((response) => {
            if (response.ok) {
                toast('Departamento criado com sucesso', '#4BA036')
                const modal = document.querySelector('.create__department')
                modal.close()

            } else {
                ('Não foi possível criar departamento, tente novamente', '#CE4646')
            }
        })
    return department
}

export const getAllUsers = async () => {
    const user = await fetch(`${baseURL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => response.json())
    return user
}

export const editUserAdmin = async (id, editBody) => {
    const user = await fetch(`${baseURL}/admin/update_user/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editBody)
    })
    .then((response) => {
        if(response.ok){
            toast('Usuário atualizado com sucesso', '#4BA036')
            const modal = document.querySelector('.edit__user--admin')
            modal.close()
        } else {
            toast('Não foi possível atualizar o usuário, tente novamente', '#CE4646')
        }
    })
    return user
}

export const deleteUserAdmin = async (id) => {
    const user = await fetch(`${baseURL}/admin/delete_user/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        if(response.ok){
            toast('Usuário deletado com sucesso', '#4BA036')
            const modal = document.querySelector('.delete__user')
            modal.close()
        } else {
            toast('Não foi possível deletar o usuário, tente novamente', '#CE4646')
        }
    })
    return user
}

export const editDepartmentAdmin = async (uuid, description) => {
    const department = await fetch(`${baseURL}/departments/${uuid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(description)
    })
    .then((response) => {
        if(response.ok){
            toast('Descrição alterada com sucesso sucesso', '#4BA036')
            const modal = document.querySelector('.edit__department--admin')
            modal.close()
        } else {
            toast('Não foi possível alterar a descrição, tente novamente', '#CE4646')
        }
    })
    return department
}

export const deleteDepartment = async (uuid) => {
    const department = await fetch(`${baseURL}/departments/${uuid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        if(response.ok){
            toast('Departamento deletado com sucesso', '#4BA036')
            const modal = document.querySelector('.delete__department--admin')
            modal.close()
        } else {
            toast('Não foi possível deletar o departamento, tente novamente', '#CE4646')
        }
    })
    return department
}

export const usersOutOfWork = async () => {
    const user = await fetch(`${baseURL}/admin/out_of_work`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => response.json())
    return user
}

export const dismissUserAdmin = async (id) => {
    const user = await fetch(`${baseURL}/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        if(response.ok){
            toast('Usuário demitido com sucesso', '#4BA036')
            const modal = document.querySelector('.view__department--admin')
            modal.close()
        } else {
            toast('Não foi possível demitir o usuário, tente novamente', '#CE4646')
        }
    })
    return user
}

export const hireUserAdmin = async(userBody) => {
    const user = await fetch(`${baseURL}/departments/hire/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userBody)
    })
    .then((response) => {
        if(response.ok){
            toast('Usuário contratado com sucesso', '#4BA036')
            const modal = document.querySelector('.view__department--admin')
            modal.close()
        } else {
            toast('Não foi possível contratar o usuário, tente novamente', '#CE4646')
        }
    })
    return user
}






