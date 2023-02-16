function redirect() {
    const newSeachButton = document.querySelector('.error--button')
    newSeachButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}
redirect()