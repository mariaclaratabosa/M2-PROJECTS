const redirect = () => {
    const newSearchButton = document.querySelector('.error--button')
    newSearchButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}
redirect()