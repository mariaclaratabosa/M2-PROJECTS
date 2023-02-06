function showMenu(){
    const buttonMenu = document.querySelector('.menu-mobile')
    const navContainer = document.querySelector('.nav-container')
    const name = document.querySelector('.name')

    buttonMenu.addEventListener('click', () => {
        name.classList.toggle('show-name')
        if(navContainer.classList.contains('show')){
            navContainer.classList.add('remove')
            buttonMenu.src = "./assets/img/menu.png"
            setTimeout(() => {
                navContainer.classList.remove('show', 'remove')
            }, 990)
        } else {
            navContainer.classList.add('show')
            buttonMenu.src = "./assets/img/close.png"
        }
    })
}
showMenu()


