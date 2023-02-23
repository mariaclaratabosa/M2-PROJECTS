async function consumePokeAPI() {
    const pokemonsInAPI = await fetch('https://pokeapi.co/api/v2/pokemon')
    .then((response) => response.json())
    .catch((error) => console.log(error))

    return pokemonsInAPI
}