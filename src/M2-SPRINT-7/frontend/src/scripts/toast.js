export const toast = (message, color) => {
    const body = document.querySelector('body')
    const container = document.createElement('div')
    const text = document.createElement('p')

    container.classList.add('toast__container', 'toast__add')
    text.classList.add('toast__text')
    container.style.backgroundColor = color
    text.innerText = message

    container.appendChild(text)
    body.appendChild(container)

    setTimeout(() => {
        container.classList.add('toast__remove')
    }, 3000)
    setTimeout(() => {
        body.removeChild(container)
    }, 4990)
}