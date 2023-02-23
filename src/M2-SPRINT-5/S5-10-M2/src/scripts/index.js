async function renderPokemons() {
    const loading = document.querySelector('#loading')
    const pokemonsList = document.querySelector('#pokemons--list')
    const listaDePokemons = await consumePokeAPI()
    listaDePokemons.results.forEach(pokemon => {
        const numberInPokedex = pokemon.url.slice(34, -1)
        setTimeout(() => {
            loading.innerHTML = ''
            pokemonsList.insertAdjacentHTML('beforeend',
            `<li class="pokemon--item">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberInPokedex}.png" alt="${pokemon.name}" class="pokemon--image">
            <p class="pokemon--name">${pokemon.name}</p>
            </li> `
            )
        }, 1000)
    })
}

async function searchPokemon(pokemonName) {
    const pokemonInAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .catch((error) => console.log(error))

    const pokemon = {
        name: pokemonInAPI.name,
        id: pokemonInAPI.id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInAPI.id}.png`
    }

    return pokemon
}

function handleSearchPokemon() {
    const searchPokemonButton = document.querySelector('#search--pokemon__button')
    const searchPokemonInput = document.querySelector('#search--pokemon')

    searchPokemonButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const pokemonName = searchPokemonInput.value.toLowerCase()
        const pokemon = await searchPokemon(pokemonName)

        const pokemonsList = document.querySelector('#pokemons--list')
        pokemonsList.innerHTML = ''
        pokemonsList.insertAdjacentHTML('beforeend',
        `<li class="pokemon--item">
        <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="pokemon--image">
        <p class="pokemon--name">${pokemon.name}</p>
        </li> `
        )
    })
}

renderPokemons()
handleSearchPokemon()