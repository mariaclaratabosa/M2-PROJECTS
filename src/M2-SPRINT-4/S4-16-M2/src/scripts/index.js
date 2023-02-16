async function searchUser(value) {
    const user = await fetch(`https://api.github.com/users/${value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .then(responseJson => {
            localStorage.setItem("searchUser", JSON.stringify(responseJson))
            if(responseJson.id){
                window.location.replace('./src/pages/profile.html')
            } else {
                window.location.replace('./src/pages/error.html')
            }
            return responseJson
        })
    return user
}

export async function form() {
    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const input = form.children[1].value
        searchUser(input)
    })
}
form()