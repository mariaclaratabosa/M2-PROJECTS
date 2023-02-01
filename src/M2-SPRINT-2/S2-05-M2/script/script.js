function filterCountry(data) {
  let filteredCountry = data.filter((country) => country.country == 'Brasil')
  return filteredCountry
}
console.log(filterCountry(data))

function filterPrice(data) {
  let filteredPrice = data.filter((price) => price.price > 200)
  return filteredPrice
}
console.log(filterPrice(data))

function filterIsOpen(data) {
  let filteredOpen = data.filter((isOpen) => isOpen.isOpen == true)
  return filteredOpen
}
console.log(filterIsOpen(data))

function filterHotelName(data) {
  let filteredName = data.filter((name)=> name.name == 'Copacabana Palace')
  return filteredName[0]
}

function filterToBook() {
  const hotel = filterHotelName(data)
  let filteredAvaiable = hotel.toBook.filter((isAvaliable) => isAvaliable.isAvaliable == true)
  return filteredAvaiable
}
console.log(filterToBook());
