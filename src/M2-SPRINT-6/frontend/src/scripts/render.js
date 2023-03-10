import { showPostModal, openModal, openDeleteModal, openChangeModal, closeChangeModal, closeDeleteModal, closeModal, closeCreateModal } from "./modal.js";
import { getAllPosts, createNewPost, deletePost, userRequest, updatePost } from "./requests.js";

let postModal = document.querySelector('.modal--show')

const authentication = () => {
    const token = localStorage.getItem("@petinfo:token")
    if (!token) {
        window.location.replace('../../index.html')
    }
}

function createCard(post) {
    const username = localStorage.getItem('@petinfo:username')
    const postContainer = document.createElement('li')
    const postHeader = document.createElement('div')
    const userContent = document.createElement('div')
    const userImage = document.createElement('img')
    const divButtons = document.createElement('div')
    const editPost = document.createElement('button')
    const deletePost = document.createElement('button')
    const userName = document.createElement('span')
    const postBars = document.createElement('span')
    const postDate = document.createElement('span')
    const postTitle = document.createElement('h2')
    const postContent = document.createElement('p')
    const showPost = document.createElement('button')
    
    editPost.innerText = "Editar"
    editPost.setAttribute('data_id', post.id)
    editPost.addEventListener('click', () => {
        const changePostModal = document.querySelector('.modal--edit')
        const changeTitle = document.querySelector('#change--title')
        const changeContent = document.querySelector('#change--content')
        changeTitle.value = post.title
        changeContent.value = post.content
        changePostModal.showModal()
        getFormChangeData(post.id, changePostModal)
        closeChangeModal()
    })

    deletePost.innerText = "Excluir"
    deletePost.addEventListener('click', () => {
        const deletePostModal = document.querySelector('.modal--delete')
        deletePostModal.showModal()
        const deleteConfirm = document.querySelector('.delete--confirm')
        deleteConfirm.addEventListener('click', async (event) => {
            event.preventDefault()
            await handleDelete(post.id, deletePostModal)
        })
        closeDeleteModal()
    })
    
    showPost.innerText = "Acessar publicação"
    showPost.setAttribute('data-id', post.id)
    showPost.addEventListener('click', () => {
        const modal = showPostModal(post)
        openModal(modal)
        postModal.appendChild(modal)
    })
    
    postTitle.innerText = post.title
    postContent.innerText = `${post.content.substring(0, 145)}...`
    userImage.src = post.user.avatar
    userName.innerText = post.user.username
    postBars.innerText = ' | '
    
    postContainer.classList.add('post--item')
    postHeader.classList.add('post--header')
    userContent.classList.add('post--user__content')
    divButtons.classList.add('post--buttons')
    editPost.classList.add('button--edit')
    deletePost.classList.add('button--delete')
    userImage.classList.add('post--user__image')
    postBars.classList.add('post--bars')
    postDate.classList.add('post--date')
    postTitle.classList.add('post--title')
    postContent.classList.add('post--content')
    showPost.classList.add('show--post')
    
    const createdAt = new Date()
    postDate.innerHTML = `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`
    
    if(post.user.username == username){
        divButtons.append(editPost, deletePost)
    }

    userContent.append(userImage, userName, postBars, postDate)
    postHeader.append(userContent, divButtons)
    postContainer.append(postHeader, postTitle, postContent, showPost)
    
    return postContainer
}

async function renderPosts() {
    const mainList = document.querySelector('.posts--content')
    mainList.innerHTML = ''
    
    const posts = await getAllPosts()
    posts.forEach(post => {
        const card = createCard(post)
        mainList.appendChild(card)
    })
}

async function getFormCreateData() {
    const createModal = document.querySelector('#create--post__modal')
    const inputs = document.querySelectorAll('.create--post__content')
    const publish = document.querySelector('.publish--post')
    const newPost = {}
    
    publish.addEventListener('click', async (event) => {
        event.preventDefault()
        inputs.forEach((input) => {
            newPost[input.id] = input.value
        })
        await createNewPost(newPost)
        closeModal(createModal)
        renderPosts()
    })
}

function getFormChangeData(postId, modal) {
    const inputs = document.querySelectorAll('.edit--post__content')
    const saveChanges = document.querySelector('.save--post')
    const updatedPost = {}
    
    saveChanges.addEventListener('click', async (event) => {
        event.preventDefault()
        inputs.forEach((input) => {
            updatedPost[input.name] = input.value
        })
        await updatePost(postId, updatedPost)
        closeModal(modal)
        renderPosts()
    })
}

async function handleDelete(postId, modal) {
    await deletePost(postId)
    closeModal(modal)
    renderPosts()
}

const showLogoutOption = () => {
    const button = document.querySelector('.user--img')
    const background = document.querySelector('.header--acount__after')
    const logoutOption = document.querySelector('.header--acount')
    
    button.addEventListener('click', () => {
        background.classList.toggle('hidden')
        logoutOption.classList.toggle('hidden')
        const buttonLogout = document.querySelector('.logout')
        
        buttonLogout.addEventListener('click', () => {
            localStorage.clear()
            window.location.replace('../../index.html')
        })
    })
}

showLogoutOption()
getFormCreateData()
renderPosts()
userRequest()
authentication()