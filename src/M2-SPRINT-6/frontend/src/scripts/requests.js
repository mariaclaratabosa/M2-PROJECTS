import { toast } from "./toast.js"

const token = JSON.parse(localStorage.getItem("@petinfo:token")) || ""
const baseURL = "http://localhost:3333"
const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
}

export const loginRequest = async (loginBody) => {
    const token = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
        .then((response) => {
            if (response.ok) {
                const userToken = response.json().then(({ token }) => {
                    localStorage.setItem("@petinfo:token", JSON.stringify(token))
                    return userToken
                })
                window.location.replace('./src/pages/dashboard.html')
            } else {
                const errorInput = document.querySelector('#input--senha')
                const errorMessage = document.querySelector('#error--senha')
                errorInput.classList.add('login--input__error')
                errorMessage.textContent = 'Email ou senha incorretos'
                errorMessage.classList.add('login--error__message')
            }
        })
    return token
}

export const userRequest = async () => {
    const userData = await fetch(`${baseURL}/users/profile`, {
        method: "GET",
        headers: requestHeaders,
    })
        .then((response) => response.json())
    const userAvatar = document.querySelector('.user--img')
    const userName = document.querySelector('.account--username')
    userAvatar.src = userData.avatar
    userName.innerText = userData.username
    localStorage.setItem('@petinfo:username', userData.username)
}

export const registerRequest = async (registerBody) => {
    const newUser = await fetch(`${baseURL}/users/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(registerBody)
    })
        .then((response) => {
            if (response.ok) {
                toast("Sua conta foi criada com sucesso", `Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href='../../index.html'>Acessar a página de login</a>`)
                return response.json()
            } else {
                response.json().then((responseError) => {
                toast(responseError.message, ' ')
                })
            }
        })
    return newUser
}

export const createNewPost = async (postBody) => {
    const newPost = await fetch(`${baseURL}/posts/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(postBody),
    })
        .then((response) => {
            if (response.ok) {
                const postJson = response.json().then((responseJson) => {
                    return responseJson
                })
                return postJson
            }
        })
    return newPost
}

export const getAllPosts = async () => {
    const allPosts = await fetch(`${baseURL}/posts`, {
        method: "GET",
        headers: requestHeaders
    })
        .then((response) => response.json())
    return allPosts
}

export const readPostById = async (postId) => {
    const post = await fetch(`${baseURL}/posts/${postId}`, {
        method: "GET",
        headers: requestHeaders,
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
    return post
}

export const updatePost = async (postId, postBody) => {
    const post = await fetch(`${baseURL}/posts/${postId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
    return post
}

export const deletePost = async (postId) => {
    const post = await fetch(`${baseURL}/posts/${postId}`, {
        method: "DELETE",
        headers: requestHeaders,
    })
        .then((response) => {
            if (response.ok) {
                toast("Post deletado com sucesso", `O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed`)
            } else {
                response.json().then((responseError) => toast(responseError.message, ' '))
            }
        })
    return post
}

