const logoutButton = document.querySelector('#logout-button');
const publishButton = document.querySelector('#publish-button');
const addImgButton = document.querySelector('#add-img-button');
const tweetContent = document.querySelector('#tweet-content');
const tweetsContainer = document.querySelector('.tweets-container');
// Aquí defino la URL de la imagen predeterminada para el perfil
const defaultPerfilImg = 'https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?w=996&t=st=1699501372~exp=1699501972~hmac=51078fb4a29f5608ea71a9185ba340be0fc81f9a41a4ba95697a0d8c52a83ada';

function createPost(postContent, imageUrl, date) {
  const perfilImg = localStorage.getItem('perfilImage') || defaultPerfilImg;
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Usuario Anónimo' };
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  const newPost = {
    username: user.name, 
    content: postContent,
    image: imageUrl,
    date,
    perfilImg,
    id: new Date().getTime().toString(),
    comments: [],
  };

  posts.push(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));
}
function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

publishButton.addEventListener('click', function (event) {
  event.preventDefault();

  const tweetContentValue = tweetContent.value.trim();
  const tweetImage = localStorage.getItem('tweetImage');
  const perfilImg = localStorage.getItem('perfilImage') || defaultPerfilImg;
  const username = localStorage.getItem('login-success'); 

  if (tweetContentValue === '') {
    alert('El contenido del tweet no puede estar vacío.');
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

  tweetContent.value = '';
  localStorage.removeItem('tweetImage');
});
//maneja el evento de añadir una imagen al tweet
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

//muestra los tweets guardados en el localStorage
function displayTweets() {
  const tweets = getPosts();

  tweets.forEach(tweet => {
    const tweetElement = createTweetElement(tweet);
    tweetsContainer.appendChild(tweetElement);
  });
}

//se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
  displayTweets();
  console.log('updateNavbarButton() ejecutada');
});

//crea un elemento HTML para mostrar un tweet
function createTweetElement(tweet) {
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
  const likeButton = tweetElement.querySelector('.like-action');

  likeButton.addEventListener('click', () => {
    console.log('se hizo click en mg');

    if (likeButton.classList.contains('liked')) {
      // Si la tiene, la quita y reemplaza 'fa-solid' por 'fa-regular'
      likeButton.classList.remove('liked');
      likeButton.querySelector('i').classList.replace('fa-solid', 'fa-regular');
    } else {
      // Si no la tiene, la agrega y reemplaza 'fa-regular' por 'fa-solid'
      likeButton.classList.add('liked');
      likeButton.querySelector('i').classList.replace('fa-regular', 'fa-solid');
    }
  });


  return tweetElement;
}

const usuarioLogeado = JSON.parse(localStorage.getItem('login-success')) || false
if (!usuarioLogeado) {
  window.location.href = './pages/login.html'
}
