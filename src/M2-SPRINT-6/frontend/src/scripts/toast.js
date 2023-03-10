export const toast = (title, message) => {
    const body = document.querySelector('body')
    const container = document.createElement('div')
    const toastHeader = document.createElement('div')
    const image = document.createElement('img')
    const text = document.createElement('span')
    const content = document.createElement('p')


    image.src = '../assets/img/check.svg'
    text.innerText = title
    content.innerHTML = message

    container.classList.add('toast--container')
    container.classList.add('toast--show')
    toastHeader.classList.add('toast--header')
    image.classList.add('toast--image')
    text.classList.add('toast--title')
    content.classList.add('toast--content')

    toastHeader.append(image, text)
    container.append(toastHeader, content)
    body.appendChild(container)

    setTimeout(() => {
        container.classList.remove('toast--show')
    }, 4900)
}