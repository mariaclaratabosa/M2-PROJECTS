function removeDoCarrinho(produto) {
  let indexOfItem = listaDoCarrinho.findIndex(function(listaDeRoupas){
      return listaDeRoupas.id == produto.id
  })
  let item = listaDoCarrinho.splice(indexOfItem, 1)
  return item
}
