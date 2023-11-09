// Aquí declaro las variables que voy a usar para seleccionar los elementos del HTML
const logoutButton = document.querySelector('#logout-button');
const publishButton = document.querySelector('#publish-button');
const addImgButton = document.querySelector('#add-img-button');

const tweetContent = document.querySelector('#tweet-content');
const tweetsContainer = document.querySelector('.tweets-container');

const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

// Aquí defino la URL de la imagen predeterminada para el perfil
const defaultPerfilImg = 'https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?w=996&t=st=1699501372~exp=1699501972~hmac=51078fb4a29f5608ea71a9185ba340be0fc81f9a41a4ba95697a0d8c52a83ada';

// Esta función crea un post con los datos del usuario y el contenido del tweet
function createPost(username, postContent, imageUrl, date) {
  const perfilImg = localStorage.getItem('perfilImage') || defaultPerfilImg;
  const post = {
    username,
    content: postContent,
    image: imageUrl,
    date,
    perfilImg, // Usa la imagen de perfil obtenida del localStorage o la predeterminada
  };

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}
// Esta función obtiene los posts del localStorage
function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

  publishButton.addEventListener('click', function (event) {
    event.preventDefault();

    const tweetContentValue = tweetContent.value.trim();
    const username = localStorage.getItem('user');
    const tweetImage = localStorage.getItem('tweetImage');
    const perfilImg = localStorage.getItem('perfilImage') || defaultPerfilImg;

    if (tweetContentValue === '') {
      alert('El contenido del tweet no puede estar vacío.');
      return;
    }

    const tweet = {
      username,
      content: tweetContentValue,
      image: tweetImage,
      date: new Date().toLocaleString(),
      perfilImg,
    };

    createPost(username, tweetContentValue, tweetImage, tweet.date);

    const tweetElement = createTweetElement(tweet);
    // Cambia appendChild por prepend para agregar el tweet al principio
    tweetsContainer.prepend(tweetElement);

    tweetContent.value = '';
    localStorage.removeItem('tweetImage');
  });

// Esta función maneja el evento de añadir una imagen al tweet
addImgButton.addEventListener('click', function () {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.addEventListener('change', function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem('tweetImage', e.target.result);
    };
    reader.readAsDataURL(this.files[0]);
  });

  fileInput.click();
});

// Esta función muestra los tweets guardados en el localStorage
function displayTweets() {
  const tweets = getPosts();

  tweets.forEach(tweet => {
    const tweetElement = createTweetElement(tweet);
    tweetsContainer.appendChild(tweetElement);
  });
}

// Esta función se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
  displayTweets();
  updateSidebarButton();
});

// Esta función crea un elemento HTML para mostrar un tweet
function createTweetElement(tweet) {
  // console.log('Creating tweet element:', tweet);

  const tweetElement = document.createElement('div');
  tweetElement.classList.add('tweet');

  tweetElement.innerHTML = `
    <div class="tweet-author">
      <img src="${tweet.perfilImg}" alt="${tweet.username}">
      <span class="author-name">${tweet.username}</span>
    </div>
    <p class="tweet-text">${tweet.content}</p>
    ${tweet.image ? `<img src="${tweet.image}" alt="Imagen del Tweet" class="tweet-image">` : ''}
    <div class="tweet-actions">
      <span class="tweet-time">${tweet.date}</span>
      <button class="tweet-action comment-action"><i class="fa-regular fa-comment"></i></button>
      <button class="tweet-action like-action"><i class="fa-regular fa-heart"></i></button>
    </div>
  `;

  // console.log('Tweet element created:', tweetElement);
  return tweetElement;
}
// Esta función comprueba si el usuario está logueado
function isLogged() {
  return localStorage.getItem('user') !== null;
}
// Esta función actualiza el botón de la sidebar según el estado del usuario
function updateSidebarButton() {
  if (isLogged()) {
    logoutButton.textContent = 'Cerrar sesión';
    logoutButton.classList.remove('btn-primary');
    logoutButton.classList.add('btn-danger');
  } else {
    logoutButton.textContent = 'Iniciar sesión';
    logoutButton.classList.remove('btn-danger');
    logoutButton.classList.add('btn-primary');
  }
}

