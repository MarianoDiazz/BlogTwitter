const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    console.log('Users from localStorage:', users);

    const validarUsuario = users.find(user => user.email === email && user.password === password);
    console.log('Validated User:', validarUsuario);

    if (!validarUsuario) {
        return alert('Usuario y/o Contraseña incorrectos');
    }

    alert(`Bienvenido ${validarUsuario.name}`);
    localStorage.setItem('login-success', validarUsuario.name); 
    window.location.href = '../index.html';
});
