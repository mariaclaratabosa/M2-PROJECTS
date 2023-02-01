const numbers = [20, 13, 50, 36, 97];

function sumNumbers(numbers) {
  const sumValue = numbers.reduce((acumullator, element) => acumullator + element, 0)
  return sumValue
}
console.log(sumNumbers(numbers))

function totalProducts(products) {
  const sumProductsValue = products.reduce((acumullator, element) => acumullator + element.price, 0)
  return sumProductsValue
}
console.log(totalProducts(products))

function totalProductsSize(products) {
  const sizeFilter = products.filter(elemento => elemento.size === 'GG')
  const filteredProductsSumPrice = sizeFilter.reduce((acumullator, element) => acumullator + element.price, 0)
  return filteredProductsSumPrice
}
console.log(totalProductsSize(products))

function totalProductsSale(products) {
  const saleFilter = products.filter(elemento => elemento.sale === true)
  const filteredProductsSale = saleFilter.reduce((acumullator, element) => acumullator + (element.price)*0.5, 0)
  return filteredProductsSale
}
console.log(totalProductsSale(products))

