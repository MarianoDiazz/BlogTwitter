export function mensaje() {
    console.log('mensaje para probar');
}
// Imagend e perfil por defecto
export const defaultPerfilImg =
    "https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?w=996&t=st=1699501372~exp=1699501972~hmac=51078fb4a29f5608ea71a9185ba340be0fc81f9a41a4ba95697a0d8c52a83ada";

// Toastify
export function showToast(message, className) {
    Toastify({
        text: message,
        className: className,
        style: {
            background: "red",
        },
    }).showToast();
};
// LocalStorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

// SweetAlert
export function SwalCerrarSesion() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Estás seguro de que deseas cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Cerrada!",
                text: "Has cerrado sesión exitosamente.",
                icon: "success",
            });
            localStorage.removeItem("usuario-logeado");
            localStorage.removeItem('usuario-logeado-email')
            localStorage.removeItem('perfilImage')
            window.location.href = "./pages/login.html";
        }
    });
}