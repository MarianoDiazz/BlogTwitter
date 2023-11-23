const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    console.log('Users from localStorage:', users);

    const validarUsuario = users.find(user => user.email === email && user.password === password);
    console.log('Validated User:', validarUsuario);

    if (!validarUsuario) {
        return alert('Usuario y/o Contraseña incorrectos');
    } else {
        await Swal.fire({
            title: `Bienvenido ${validarUsuario.name}`,
            text: "Te extrañamos!",
            icon: "success"
        });
        localStorage.setItem('usuario-logeado', validarUsuario.name);
        // Agrega un retraso (timeout) antes de redirigir
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 40); // Espera 1 segundo (puedes ajustar el tiempo según tus necesidades)
    }
});
