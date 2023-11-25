const logoutButton = document.querySelector("#logout-button");
const publishButton = document.querySelector("#publish-button");
const addImgButton = document.querySelector("#add-img-button");
const tweetContent = document.querySelector("#tweet-content");
const tweetsContainer = document.querySelector(".tweets-container");

//se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  displayTweets();
});

function getPosts() {
  const tweetsDefault = JSON.parse(localStorage.getItem("tweetsDefault")) || [];
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  return [...posts, ...tweetsDefault];
}
// Aquí defino la URL de la imagen predeterminada para el perfil
const defaultPerfilImg =
  "https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?w=996&t=st=1699501372~exp=1699501972~hmac=51078fb4a29f5608ea71a9185ba340be0fc81f9a41a4ba95697a0d8c52a83ada";
//muestra los tweets guardados en el localStorage
function displayTweets() {
  const tweets = getPosts();
  console.log(tweets);
  tweets.forEach((tweet) => {
    const tweetElement = createTweetElement(tweet);
    tweetsContainer.appendChild(tweetElement);
  });
}

function createPost(postContent, imageUrl, date) {
  const perfilImg = localStorage.getItem("perfilImage") || defaultPerfilImg;
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const username = localStorage.getItem("usuario-logeado");

  const newPost = {
    username: username,
    content: postContent,
    image: imageUrl,
    date,
    perfilImg,
    id: new Date().getTime().toString(),
    comments: [],
    isFav: false, // Agregamos el campo isFav y lo inicializamos como false
  };

  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
}

publishButton.addEventListener("click", function (event) {
  event.preventDefault();

  const tweetContentValue = tweetContent.value.trim();
  const tweetImage = localStorage.getItem("tweetImage");
  const perfilImg = localStorage.getItem("perfilImage") || defaultPerfilImg;
  const username = localStorage.getItem("usuario-logeado");

  if (tweetContentValue === "") {
    alert("El contenido del tweet no puede estar vacío.");
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
  localStorage.removeItem("tweetImage");
});

//crea un elemento HTML para mostrar un tweet
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
      ? `<img src="${tweet.image}" alt="Imagen del Tweet" class="tweet-image w-100">`
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
      // Si la tiene, la quita y reemplaza 'fa-solid' por 'fa-regular'
      likeButton.classList.remove("liked");
      likeButton.querySelector("i").classList.replace("fa-solid", "fa-regular");
    } else {
      // Si no la tiene, la agrega y reemplaza 'fa-regular' por 'fa-solid'
      likeButton.classList.add("liked");
      likeButton.querySelector("i").classList.replace("fa-regular", "fa-solid");
    }
  });

  const favButton = tweetElement.querySelector('.fav-action')
  favButton.addEventListener('click', () => {
    console.log("se hizo click");

    // Obtener el ID del tweet
    const tweetId = tweet.id;

    // Cambiar el valor de isFav a true en el localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.map(post => {
      if (post.id === tweetId) {
        post.isFav = true;
      }
      return post;
    });
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    // Llamar a la función guardarTweet con el tweet
    guardarTweet(tweet);

    Toastify({
      text: "Añadido a favoritos",
      className: "info",
      style: {
        background: "red",
      }
    }).showToast();
  });

  return tweetElement;
}


function guardarTweet(tweet) {
  let tweetsGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];

  // Añadir tweets al array
  tweetsGuardados.unshift(tweet);
  // Guardar el array en LS
  localStorage.setItem('favoritos', JSON.stringify(tweetsGuardados));

  // Cambiar el valor de isFav a true
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const updatedPosts = posts.map(post => {
    if (post.id === tweet.id) {
      post.isFav = true;
    }
    return post;
  });
  localStorage.setItem('posts', JSON.stringify(updatedPosts));
}







// modo oscuro
// Selecciona el interruptor
const darkModeSwitch = document.querySelector("#darkModeSwitch");

// Añade un event listener para el evento 'change'
darkModeSwitch.addEventListener("change", function () {
  // Comprueba si el interruptor está activado
  if (this.checked) {
    // Si es así, cambia a modo oscuro
    document.body.classList.add("modo-oscuro");
    document.body.classList.remove("modo-claro");
  } else {
    // Si no, cambia a modo claro
    document.body.classList.remove("modo-oscuro");
    document.body.classList.add("modo-claro");
  }
});

const URL = "https://655fed2983aba11d99cffa88.mockapi.io/tweets/usersTweets";

fetch(URL)
  .then((respuesta) => respuesta.json())
  .then((data) => localStorage.setItem("tweetsDefault", JSON.stringify(data)))
  .catch((error) => console.log(error));

  const perfilInfoContainer = document.querySelector('.perfil_info');

  // Crea el elemento del perfil con backticks
  const perfilInfoElement = document.createElement('div');
  perfilInfoElement.classList.add('perfil__info');
  
  perfilInfoElement.innerHTML = `
    <div class="perfil__img">
      <img src="${localStorage.getItem('perfilImage') || defaultPerfilImg}" alt="Imagen de perfil">
    </div>
    <div class="perfil__details">
      <h3>${localStorage.getItem('usuario-logeado') || 'Nombre predeterminado'}</h3>
      <p>${localStorage.getItem('usuario-logeado-mail') || 'Correo predeterminado'}</p>
    </div>
    <button class="btn btn-outline-danger" id="logout-button"><i class="fas fa-sign-out-alt"></i></button>`;
  
  // Agrega el elemento del perfil al contenedor
  perfilInfoContainer.appendChild(perfilInfoElement);
  
const logout = perfilInfoElement.querySelector("#logout-button");
logout.addEventListener("click", () => {
  console.log("se hizo click");
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      localStorage.removeItem("usuario-logeado");
      window.location.href = "./pages/login.html";
    }
  });
});