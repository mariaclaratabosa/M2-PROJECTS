// Cria um novo array a partir de um array existente, aplicando a função callback a cada elemento do array preexistente. 
// Percorre o array original com o loop for, aplica a função callback e armazena o resultado em um novo array, retornando-o
function newMap(array, callback) {
  const newArrayMap = []
  for (let i = 0; i < array.length; i++) {
    newArrayMap.push(callback(array[i], i, array))
  }
  return newArrayMap
}

//Cria um novo array a partir de um array existente, filtrando elementos com base na função callback.
//Percorre o array original com o loop for, verificando se cada elemento atende aos critérios da callback, caso sim, é armazenado no novo array
function newFilter(array, callback) {
  let newArrayFilter = []
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      newArrayFilter.push(array[i])
    }
  }
  return newArrayFilter
}

//Percorre o array com o loop for e verifica se o item existe no array, através da função callback, assim, o elemento é retornado, caso não satisfaça a callback, retorna undefined
function newFind(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i]
    }
  }
  return undefined
}

//Define um valor inicial, podendo ser um pre-determinado ou 0, precorre o array com o loop for, atualizando a variável sum a cada vez que o array é percorrido com a função reducer em cada iteração
function newReduce(array, reducer, initialValue) {
  let sum = initialValue || 0
  for (let i = 0; i < array.length; i++) {
    sum = reducer(sum, array[i])
  }
  return sum
}

export {
  newMap,
  newFilter,
  newFind,
  newReduce
}
