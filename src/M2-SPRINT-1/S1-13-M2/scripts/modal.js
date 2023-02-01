/* Desenvolva seu código aqui... */
function handleModal() {
  const button = document.querySelector('.btn-cadastrar')
  const modalController = document.querySelector('.modalController')

  button.addEventListener('click', () => {
      modalController.showModal()

      closeModal()
  })
}

function closeModal() {
  const button = document.querySelector('.closeModal')
  const modalController = document.querySelector('.modalController')

  button.addEventListener('click', () => {
      modalController.close()
  })
}
handleModal()

let password = document.querySelector('#password')
let confirmPassword = document.querySelector('#confirm_password')

function validatePassword(){
  if(password.value != confirmPassword.value){
      confirmPassword.setCustomValidity('As senhas não correspondem')
  } else {
      confirmPassword.setCustomValidity('')
  }
}
password.onchange = validatePassword
confirmPassword.onkeyup = validatePassword
