const renderUser = () => {
    const userContent = JSON.parse(localStorage.getItem("searchUser"))
    const userImage = document.querySelector('.user--image')
    const userName = document.querySelector('.user--name')
    const userRepos = document.querySelector('.repos--list')
    
    userImage.src = userContent.avatar_url
    userName.innerText = userContent.name

    fetch(userContent.repos_url)
    .then(response => {
        return response.json()
    })
    .then(responseJson => {
        responseJson.forEach(repository => {
            const repositoryContent = document.createElement('li')
            const repositoryName = document.createElement('p')
            const repositoryDescription = document.createElement('p')
            const repositoryButton = document.createElement('button')
            const repositoryLink = document.createElement('a')

            repositoryName.innerText = repository.name
            repositoryDescription.innerText = repository.description
            repositoryButton.innerHTML = 'Repositório'
            repositoryLink.href = repository.html_url
            repositoryLink.target = '_blank'

            repositoryButton.addEventListener('click', () => {
                window.open(repositoryLink.href)
            })
            
            repositoryContent.classList.add('repos--item')
            repositoryName.classList.add('repo--name')
            repositoryDescription.classList.add('repo--description')
            repositoryButton.classList.add('repo--button')

            userRepos.appendChild(repositoryContent)
            repositoryContent.append(repositoryName, repositoryDescription, repositoryButton)
            repositoryButton.append(repositoryLink)
        })
    })
}
renderUser()

const redirect = () => {
    const changeUserButton = document.querySelector('.change--user')
    changeUserButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}
redirect()