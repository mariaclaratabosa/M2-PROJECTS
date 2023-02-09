import { users, posts, suggestUsers } from "./database.js"
function renderPosts(array) {
    let postsList = document.querySelector('.posts__content')
    let postModal = document.querySelector('.post__modal')

    array.forEach((post) => {
        const postItem = document.createElement('li')
        postItem.setAttribute('class', 'posts__list--item')
        const postCard = document.createElement('div')
        postCard.setAttribute('class', 'list__item--card')
        const userImg = document.createElement('img')
        userImg.setAttribute('class', 'list__item-img')
        const userContent = document.createElement('div')
        userContent.setAttribute('class', 'list__item--usercontent')
        const userName = document.createElement('p')
        userName.setAttribute('class', 'list__item-username')
        const userStack = document.createElement('p')
        userStack.setAttribute('class', 'list__item--userstack')
        const postContent = document.createElement('div')
        postContent.setAttribute('class', 'list__item--content')
        const postTitle = document.createElement('h2')
        postTitle.setAttribute('class', 'list__item--title')
        const postDescription = document.createElement('p')
        postDescription.setAttribute('class', 'list__item--description')
        const postButtons = document.createElement('div')
        postButtons.setAttribute('class', 'list__item--buttons')
        const postOpenButton = document.createElement('button')
        postOpenButton.setAttribute('class', 'list__item--buttonopen')
        const postLikesDiv = document.createElement('div')
        postLikesDiv.setAttribute('class', 'list__item--likes')
        const postLikeButton = document.createElement('span')
        postLikeButton.setAttribute('class', '.list__item--likebutton')
        const postLikes = document.createElement('p')

        userImg.src = post.img
        userName.innerText = post.user
        userStack.innerText = post.stack

        postTitle.innerText = post.title
        postDescription.innerText = `${post.text.substring(0, 150)}...`
        postOpenButton.innerText = 'Abrir post'
        postOpenButton.setAttribute('data-id', post.id)
        postOpenButton.addEventListener('click', () => {
            const modal = createModal(post)
            openModal(modal)
            postModal.appendChild(modal)
        })

        postLikeButton.innerHTML = '<img src="./src/assets/img/like.svg" alt="Botão de curtir">'
        postLikeButton.setAttribute('class', 'button_like--change')
        postLikes.innerText = post.likes

        postLikeButton.addEventListener('click', () => {
            if (postLikeButton.innerHTML === '<img src="./src/assets/img/like.svg" alt="Botão de curtir">') {
                postLikeButton.innerHTML = '<img src="./src/assets/img/liked.svg" alt="Botão de curtido">';
                post.likes++;
            } else {
                postLikeButton.innerHTML = '<img src="./src/assets/img/like.svg" alt="Botão de curtir">';
                post.likes--;
            }
            postLikes.innerText = post.likes;
        });

        postLikesDiv.append(postLikeButton, postLikes)
        postButtons.append(postOpenButton, postLikesDiv)
        postContent.append(postTitle, postDescription, postButtons)
        userContent.append(userName, userStack)
        postCard.append(userImg, userContent)
        postItem.append(postCard, postContent)
        postsList.appendChild(postItem)
    })
    return postsList
}
renderPosts(posts)

function createModal(post) {
    let postModal = document.querySelector('.post__modal')
    const modalDiv = document.createElement('div')
    modalDiv.setAttribute('class', 'modal__style')
    const modalHeader = document.createElement('div')
    modalHeader.setAttribute('class', 'modal__header')
    const userElements = document.createElement('div')
    userElements.setAttribute('class', 'user__elements')
    const modalUserImg = document.createElement('img')
    modalUserImg.setAttribute('class', 'modal__header--img')
    const modalUserContent = document.createElement('div')
    modalUserContent.setAttribute('class', 'modal__user--content')
    const modalUserName = document.createElement('p')
    modalUserName.setAttribute('class', 'modal__user--name')
    const modalUserStack = document.createElement('p')
    modalUserStack.setAttribute('class', 'modal__user--stack')
    const modalClose = document.createElement('button')
    modalClose.setAttribute('class', 'close__modal')
    const modalContent = document.createElement('div')
    modalContent.setAttribute('class', 'modal__content')
    const modalTitle = document.createElement('h2')
    modalTitle.setAttribute('class', 'modal__title')
    const modalDescription = document.createElement('p')
    modalDescription.setAttribute('class', 'modal__description')

    modalUserImg.src = post.img
    modalUserName.innerText = post.user
    modalUserStack.innerText = post.stack
    modalTitle.innerText = post.title
    modalDescription.innerText = post.text
    modalClose.innerText = 'X'
    modalClose.addEventListener('click', () => {
        closeModal(postModal)
        postModal.innerHTML = ''
    })

    userElements.append(modalUserImg, modalUserContent)
    modalHeader.append(userElements, modalClose)
    modalUserContent.append(modalUserName, modalUserStack)
    modalContent.append(modalTitle, modalDescription)
    modalDiv.append(modalHeader, modalContent)
    postModal.appendChild(modalDiv)

    return postModal
}

function openModal(modal) {
    modal.showModal()
}

function closeModal(modal) {
    modal.close()
}

function addNewPost() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const title = form.querySelector('.form__input--title').value
        const description = form.querySelector('.form__input--description').value
        const user = form.querySelector('.form__user--name').innerHTML
        const stack = form.querySelector('.form__user--stack').innerHTML
        const img = form.querySelector('.form__user--img').src

        const newPost = {
            title,
            text: description,
            user,
            stack,
            img,
            likes: 0
        }
        posts.unshift(newPost)
        const postsList = document.querySelector('.posts__content')
        postsList.innerHTML = ''
        renderPosts(posts)
    })
}
addNewPost()

function renderSuggestions(array) {
    const suggestionsList = document.querySelector('.users__suggestions--list')
    array.forEach((user) => {
        const userItem = document.createElement('li')
        userItem.setAttribute('class', 'suggestions__list--item')
        const userContent = document.createElement('div')
        userContent.setAttribute('class', 'suggestion__item--content')
        const userImg = document.createElement('img')
        userImg.setAttribute('class', 'suggestion__item--img')
        const userNameAndStack = document.createElement('div')
        userNameAndStack.setAttribute('class', 'suggestion__item-name-stack')
        const userName = document.createElement('p')
        userName.setAttribute('class', 'suggestion__item--name')
        const userStack = document.createElement('p')
        userStack.setAttribute('class', 'suggestion__item--stack')
        const followButton = document.createElement('button')

        userImg.src = user.img
        userName.innerText = user.user
        userStack.innerText = user.stack

        followButton.innerText = 'Seguir'
        followButton.setAttribute('class', 'button__follow')
        followButton.addEventListener('click', () => {
            let following = followButton.classList.toggle('button__following')
            if (following) {
                followButton.innerText = 'Seguindo'
            } else {
                followButton.innerText = 'Seguir'
            }
        })

        userNameAndStack.append(userName, userStack)
        userContent.append(userImg, userNameAndStack)
        userItem.append(userContent, followButton)
        suggestionsList.appendChild(userItem)
    })
}
renderSuggestions(suggestUsers)