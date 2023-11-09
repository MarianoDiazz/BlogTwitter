// Aquí declaro las variables que voy a usar para seleccionar los elementos del HTML
const loginForm = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorMessage = document.querySelector('.error-message');
const successMessage = document.querySelector('.success-message');

// Esta función valida el formato del email
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

// Esta función verifica si el usuario existe en el localStorage
function checkUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.email === email && user.password === password);
}

// Esta función guarda el usuario en el localStorage
function saveUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = { email, password };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Esta función inicia la sesión del usuario
function login(email) {
  localStorage.setItem('user', email);
}

// Esta función cierra la sesión del usuario
function logout() {
  localStorage.removeItem('user');
}

// Esta función comprueba si el usuario está logueado
function isLogged() {
  return localStorage.getItem('user') !== null;
}

// Esta función muestra un mensaje de error
function showError(message) {
  errorMessage.textContent = message;
  successMessage.textContent = '';
}

// Esta función muestra un mensaje de éxito
function showSuccess(message) {
  successMessage.textContent = message;
  errorMessage.textContent = '';
}

// Esta función limpia los campos del formulario
function clearForm() {
  email.value = '';
  password.value = '';
}

// Esta función redirige al index
function redirectToIndex() {
  window.location.href = 'index.html';
}

// Esta función maneja el evento de enviar el formulario
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (!validateEmail(emailValue)) {
    showError('El email no tiene un formato válido.');
    return;
  }

  if (passwordValue.length < 6) {
    showError('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  if (isLogged()) {
    showError('Ya estás logueado. Debes cerrar sesión para iniciar otra.');
    return;
  }

  const user = checkUser(emailValue, passwordValue);

  if (user) {
    login(emailValue);
    showSuccess('Has iniciado sesión correctamente.');
    clearForm();
    setTimeout(redirectToIndex, 1000);
  } else {
    saveUser(emailValue, passwordValue);
    showSuccess('Te has registrado y logueado correctamente.');
    clearForm();
    setTimeout(redirectToIndex, 1000);
  }
});
