const form = document.getElementById('contact-form')
const formBtn = document.getElementById('fcf-button')
const formSuccess = document.querySelector('#form-success')
const formErrors = document.querySelector('#form-errors')
const formName = document.getElementById('Name')
const formEmail = document.getElementById('Email')
const formMessage = document.getElementById('Message')

formBtn.addEventListener('click', function (e) {
  e.preventDefault(); 
  sendContactForm();
}, false);
function sendContactForm() {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false
      }
    },
    email: {
      presence: {
        allowEmpty: false
      },
      email: true
    },
    message: {
      presence: {
        allowEmpty: false
      }
    }
  }
  let formValues = {
    name: form.elements.name.value,
    email: form.elements.email.value,
    message: form.elements.message.value
  }
  let errors = validate(formValues, constraints)

  formName.style.border = ''
  formEmail.style.border = ''
  formMessage.style.border = ''
  if (errors) {
    const errorFilter = Object.keys(errors)
    let newError = document.createElement("div")
    newError.setAttribute("class", "form-errors-active")
    formErrors.appendChild(newError)
    if (errorFilter.includes('name')) {
      formName.style.border = "2px solid red"
    }
    if (errorFilter.includes('email')) {
      formEmail.style.border = "2px solid red"
    }
    if (errorFilter.includes('message')) {
      formMessage.style.border = "2px solid red"
    }
    newError.innerHTML = "Please fill in the required fields."
    setTimeout(function () {
      newError.parentNode.removeChild(newError);
    }, 5000);
  }
  else {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/contact-form.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let newFormSuccess = document.createElement("div")
        newFormSuccess.setAttribute("class", "form-success-active")
        formSuccess.appendChild(newFormSuccess)
        newFormSuccess.innerHTML = 'Thank you for your message.'
        formName.style.border = ''
        formEmail.style.border = ''
        formMessage.style.border = ''
        formName.value = ''
        formEmail.value = ''
        formMessage.value = ''
        setTimeout(function () {
          newFormSuccess.parentNode.removeChild(newFormSuccess)
        }, 6500)
        }
      }
	xhr.send(new FormData(form));
  }
}