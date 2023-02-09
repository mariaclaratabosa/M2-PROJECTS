import { users, books } from "./database.js";

function render(array, type) {
    let userList
    if (type === 'user') {
        userList = document.querySelector('.users__list')
    } else if (type === 'book') {
        userList = document.querySelector('.books__list')
    }
    userList.innerHTML = ''
    array.forEach((item) => {
        let booksList
        if (type === 'user') {
            booksList = createCardInstructors(item)
        } else if (type === 'book') {
            booksList = createCardBooks(item)
        }
        userList.appendChild(booksList)
    });
}
render(users, 'user')
render(books, 'book')

function createCardInstructors(user) {
    const userListItem = document.createElement('li')
    userListItem.classList.add('users__list--item')
    const userContent = document.createElement('div')
    userContent.classList.add('user__content')
    const userName = document.createElement('p')
    const userCargo = document.createElement('p')
    const userEstado = document.createElement('p')

    userName.innerText = user.nome
    userCargo.innerText = user.cargo
    userEstado.innerText = user.estado

    userContent.append(userName, userCargo, userEstado)
    userListItem.appendChild(userContent)

    return userListItem
}

function createCardBooks(book){
    const bookListItem = document.createElement('li')
    bookListItem.classList.add('books__list--item')
    const bookContent = document.createElement('div')
    bookContent.classList.add('book__content')
    const bookImage = document.createElement('img')
    bookImage.classList.add('book__item--img')
    const bookNameAndAuthor = document.createElement('div')
    bookNameAndAuthor.classList.add('book__nameEAuthor')
    const bookName = document.createElement('p')
    const bookAuthor = document.createElement('p')

    bookImage.src = book.imagem
    bookName.innerText = book.nome
    bookAuthor.innerText = book.autor 

    bookNameAndAuthor.append(bookName, bookAuthor)
    bookContent.append(bookImage, bookNameAndAuthor)
    bookListItem.append(bookContent)

    return bookListItem
}



