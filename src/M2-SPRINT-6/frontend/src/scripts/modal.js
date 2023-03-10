import { userRequest, readPostById } from "./requests.js"

export const openModal = (modal) => {
    modal.showModal()
}

export const closeModal = (modal) => {
    modal.close()
}

export function showPostModal(post){
    const postModal = document.querySelector('.modal--show')
    const modalDiv = document.createElement('div')
    const modalHeader = document.createElement('div')
    const userElements = document.createElement('div')
    const modalUserContent = document.createElement('div')
    const modalUserImg = document.createElement('img')
    const modalUserName = document.createElement('span')
    const modalBars = document.createElement('span')
    const modalTime = document.createElement('span')
    const modalClose = document.createElement('button')
    const modalContent = document.createElement('div')
    const modalTitle = document.createElement('h2')
    const modalDescription = document.createElement('p')

    modalUserImg.src = post.user.avatar
    modalUserName.innerText = post.user.username
    modalBars.innerText = " | "
    const createdAt = new Date()
    modalTime.innerText = `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`
    modalClose.innerText = "X"
    modalTitle.innerText = post.title 
    modalDescription.innerText = post.content

    modalDiv.classList.add('modal--controller')
    modalHeader.classList.add('modal--header')
    userElements.classList.add('user--elements')
    modalUserImg.classList.add('modal--header__img')
    modalUserContent.classList.add('modal--user__content')
    modalUserName.classList.add('modal--user__name')
    modalBars.classList.add('modal--bars')
    modalTime.classList.add('modal--time')
    modalClose.classList.add('modal--close')
    modalContent.classList.add('modal--content')
    modalTitle.classList.add('modal--title')
    modalDescription.classList.add('modal--description')

    modalClose.addEventListener('click', () => {
        postModal.innerHTML = " "
        closeModal(postModal)
    })

    userElements.append(modalUserImg, modalUserContent)
    modalHeader.append(userElements, modalClose)
    modalUserContent.append(modalUserName, modalBars, modalTime)
    modalContent.append(modalTitle, modalDescription)
    modalDiv.append(modalHeader, modalContent)
    postModal.appendChild(modalDiv)

    return postModal
}

function openCreateModal() {
    const createPost = document.querySelector('.create--post')
    const createPostModal = document.querySelector('#create--post__modal')
    createPost.addEventListener('click', () => {
        openModal(createPostModal)
        closeCreateModal()
    })
}
openCreateModal()

export function closeCreateModal() {
    const createPostModal = document.querySelector('#create--post__modal')
    const modalClose = document.querySelector('#create--modal__close')
    const cancelPost = document.querySelector('.create--post__cancel')
    modalClose.addEventListener('click', () => {
        closeModal(createPostModal)
    })
    cancelPost.addEventListener('click', () => {
        closeModal(createPostModal)
    })
}

export function openChangeModal(title, content) {
    const changePost = document.querySelectorAll('.button--edit')
    const changePostModal = document.querySelector('.modal--edit')
    const changeTitle = document.querySelector('#change--title')
    const changeContent = document.querySelector('#change--content')
    changePost.forEach((button) => {
        button.addEventListener('click', async () => {
            changeTitle.value = title
            changeContent.value = content
            changePostModal.showModal()
            closeChangeModal()
        })
    })
}

export function closeChangeModal() {
    const changePostModal = document.querySelector('.modal--edit')
    const modalClose = document.querySelector('#edit--modal__close')
    const cancelEdit = document.querySelector('.edit--post__cancel')
    modalClose.addEventListener('click', () => {
        closeModal(changePostModal)
    })
    cancelEdit.addEventListener('click', () => {
        closeModal(changePostModal)
    })
}


export function openDeleteModal(){
    const deletePost = document.querySelectorAll('.button--delete')
    const deletePostModal = document.querySelector('.modal--delete')
    deletePost.forEach((button) => {
        button.addEventListener('click', () => {
            deletePostModal.showModal()
            closeDeleteModal()
        })
    })
}

export function closeDeleteModal() {
    const deletePostModal = document.querySelector('.modal--delete')
    const modalClose = document.querySelector('#delete--modal__close')
    const cancelDelete = document.querySelector('.delete--cancel')
    modalClose.addEventListener('click', () => {
        closeModal(deletePostModal)
    })
    cancelDelete.addEventListener('click', () => {
        closeModal(deletePostModal)
    })
}


userRequest()