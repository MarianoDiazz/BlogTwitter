const publishButton = document.querySelector("#publish-button");
const tweetContent = document.querySelector("#tweet-content");
const tweetsContainer = document.querySelector(".tweets-container");
const username = localStorage.getItem("usuario-logeado");
import { showToast, getLocalStorage, setLocalStorage, defaultPerfilImg,SwalCerrarSesion } from "./usets.js";


if (!username) {
  alert("Debes iniciar sesion primero")
  window.location.href = "./pages/login.html";
}
const subirImagen = document.querySelector('#subir-img');


subirImagen.addEventListener('change', (e) => {
  const confirmarImagen = confirm("¿Deseas cargar la imagen?");

  if (confirmarImagen) {
    const imagenElegida = new FileReader();

    imagenElegida.onload = function (e) {
      const img = e.target.result;
      localStorage.setItem('imagen', img);

      showToast("Imagen cargada", "success");
    };

    const archivo = e.target.files[0];
    archivo ? imagenElegida.readAsDataURL(archivo) : showToast("No se seleccionó ninguna imagen", "error");

  } else {
    showToast("Imagen cancelada", "error");
  }
});
displayTweets();


function getPosts() {
  const tweetsDefault = getLocalStorage('tweetsDefault') || [];
  const posts = getLocalStorage('posts') || [];
  return [...posts, ...tweetsDefault];
}
function displayTweets() {
  const tweets = getPosts();
  console.log(tweets);
  tweets.forEach((tweet) => {
    const tweetElement = createTweetElement(tweet);
    tweetsContainer.appendChild(tweetElement);
  });
}

function createPost(postContent, imageUrl, date) {
  const perfilImg = localStorage.getItem('perfilImg') || defaultPerfilImg;
  const posts = getLocalStorage('posts') || [];
  const newPost = {
    username: username,
    content: postContent,
    image: imageUrl,
    date,
    perfilImg,
    id: new Date().getTime().toString(),
    comments: [],
    isFav: false,
  };

  posts.unshift(newPost);
  setLocalStorage('posts', posts)
}

publishButton.addEventListener("click", function (event) {
  event.preventDefault();

  const tweetContentValue = tweetContent.value.trim();
  const tweetImage = localStorage.getItem('imagen')
  const perfilImg = localStorage.getItem('perfilImage') || defaultPerfilImg;

  if (tweetContentValue === "" && !tweetImage) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puedes publicar un post vacio!",
    });
    return;
  }
  const tweet = {
    content: tweetContentValue,
    image: tweetImage,
    date: new Date().toLocaleString(),
    perfilImg,
  };

  createPost(tweet.content, tweet.image, tweet.date);
  const tweetElement = createTweetElement({
    username,
    ...tweet,
  });
  tweetsContainer.prepend(tweetElement);
  tweetContent.value = "";
  localStorage.removeItem("imagen");
});

function createTweetElement(tweet) {
  const tweetElement = document.createElement("article");
  tweetElement.classList.add("tweet");

  tweetElement.innerHTML = `
    <div class="tweet-author">
      <img src="${tweet.perfilImg}" alt="${tweet.username}">
      <span class="author-name">${tweet.username}</span>
    </div>
    <p class="tweet-text">${tweet.content}</p>
    ${tweet.image
      ? `<img src="${tweet.image}" alt="Imagen del Tweet" class="tweet-image">`
      : ""
    }
    <div class="tweet-actions">
      <span class="tweet-time">${tweet.date}</span>
      <button class="tweet-action comment-action"><i class="fa-regular fa-comment"></i></button>
      <button class="tweet-action like-action"><i class="fa-regular fa-heart"></i></button>
      <button class="tweet-action fav-action"><i class="fa-regular fa-bookmark"></i></button>
    </div>
  `;
  const likeButton = tweetElement.querySelector(".like-action");

  likeButton.addEventListener("click", () => {
    console.log("se hizo click en mg");

    if (likeButton.classList.contains("liked")) {
      likeButton.classList.remove("liked");
      likeButton.querySelector("i").classList.replace("fa-solid", "fa-regular");
    } else {
      likeButton.classList.add("liked");
      likeButton.querySelector("i").classList.replace("fa-regular", "fa-solid");
    }
  });

  const favButton = tweetElement.querySelector('.fav-action')
  favButton.addEventListener('click', () => {
    const tweetId = tweet.id;
    const posts = getLocalStorage('posts') || [];
    const updatedPosts = posts.map(post => {
      if (post.id === tweetId) {
        post.isFav = true;
      }
      return post;
    });
    setLocalStorage('posts', updatedPosts)
    guardarTweet(tweet);

    showToast("Se añadió a favoritos", "success");
  });

  return tweetElement;
}

function guardarTweet(tweet) {
  let tweetsGuardados = getLocalStorage("favoritos") || [];
  tweetsGuardados.unshift(tweet);
  // Guardar el array en LS
  setLocalStorage('favoritos', tweetsGuardados)
  const posts = getLocalStorage('posts') || [];
  const updatedPosts = posts.map(post => {
    if (post.id === tweet.id) {
      post.isFav = true;
    }
    return post;
  });
  setLocalStorage('posts', updatedPosts)
}
const darkModeSwitch = document.querySelector("#darkModeSwitch");

// Verificar si el modo oscuro está activado en el localStorage al cargar la página
if (localStorage.getItem("modoOscuro") === "activado") {
  document.body.classList.add("modo-oscuro");
  darkModeSwitch.checked = true;
}

darkModeSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("modo-oscuro");
    document.body.classList.remove("modo-claro");
    // Guardar el estado en el localStorage
    localStorage.setItem("modoOscuro", "activado");
  } else {
    document.body.classList.remove("modo-oscuro");
    document.body.classList.add("modo-claro");
    // Guardar el estado en el localStorage
    localStorage.removeItem("modoOscuro");
  }
});


const URL = "https://655fed2983aba11d99cffa88.mockapi.io/tweets/usersTweets";

fetch(URL)
  .then((respuesta) => respuesta.json())
  .then((data) => setLocalStorage('tweetsDefault', data))
  .catch((error) => console.log(error));

const perfilInfoContainer = document.querySelector('.perfil_info');

const perfilInfoElement = document.createElement('div');
perfilInfoElement.classList.add('perfil__info');

perfilInfoElement.innerHTML = `
    <div class="perfil__img">
      <img  src="${localStorage.getItem('perfilImage') || defaultPerfilImg}" alt="Imagen de perfil">
    </div>
    <div class="perfil__details">
      <h3>${localStorage.getItem('usuario-logeado')}</h3>
      <p>${localStorage.getItem('usuario-logeado-mail')}'}</p>
    </div>
    <button class="btn btn-outline-danger" id="logout-button"><i class="fas fa-sign-out-alt"></i></button>`;

perfilInfoContainer.appendChild(perfilInfoElement);
const perfilImg = perfilInfoElement.querySelector('.perfil__img img');
const fileInput = document.createElement('input');
fileInput.type = 'file';

perfilImg.addEventListener('click', () => {
  Swal.fire({
    title: 'Cambiar imagen de perfil',
    text: '¿Quieres cambiar tu imagen de perfil?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      // Si se confirma, abre el explorador de archivos al hacer clic en el input de tipo file
      fileInput.click();
    }
  });
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imageDataURL = reader.result;
      perfilImg.src = imageDataURL;

      localStorage.setItem('perfilImage', imageDataURL);
    };
  }
});

// Cerrar Sesion
const logout = perfilInfoElement.querySelector("#logout-button");
logout.addEventListener("click", () => {
  SwalCerrarSesion()
});