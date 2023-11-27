const logoutButton = document.querySelector("#logout-button");
const publishButton = document.querySelector("#publish-button");
const addImgButton = document.querySelector("#add-img-button");
const tweetContent = document.querySelector("#tweet-content");
const tweetsContainer = document.querySelector(".tweets-container");


const subirImagen = document.querySelector('#subir-img');
// funcion para toastify
const showToast = (message, className) => {
  Toastify({
    text: message,
    className: className,
    style: {
      background: "red",
    },
  }).showToast();
};

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

    if (archivo) {
      imagenElegida.readAsDataURL(archivo);
    } else {
      showToast("No se seleccionó ninguna imagen", "error");
    }
  } else {
    showToast("Imagen cancelada", "error");
  }
});
  displayTweets();


function getPosts() {
  const tweetsDefault = JSON.parse(localStorage.getItem("tweetsDefault")) || [];
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  return [...posts, ...tweetsDefault];
}
// Aquí defino la URL de la imagen predeterminada para el perfil
const defaultPerfilImg =
  "https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?w=996&t=st=1699501372~exp=1699501972~hmac=51078fb4a29f5608ea71a9185ba340be0fc81f9a41a4ba95697a0d8c52a83ada";
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
    isFav: false,
  };

  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
}

publishButton.addEventListener("click", function (event) {
  event.preventDefault();

  const tweetContentValue = tweetContent.value.trim();
  const tweetImage = localStorage.getItem("imagen");
  const perfilImg = localStorage.getItem("perfilImage") || defaultPerfilImg;
  const username = localStorage.getItem("usuario-logeado");

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
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.map(post => {
      if (post.id === tweetId) {
        post.isFav = true;
      }
      return post;
    });
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
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
  tweetsGuardados.unshift(tweet);
  // Guardar el array en LS
  localStorage.setItem('favoritos', JSON.stringify(tweetsGuardados));
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
const darkModeSwitch = document.querySelector("#darkModeSwitch");

darkModeSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("modo-oscuro");
    document.body.classList.remove("modo-claro");
  } else {
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

const perfilInfoElement = document.createElement('div');
perfilInfoElement.classList.add('perfil__info');

perfilInfoElement.innerHTML = `
    <div class="perfil__img">
      <img  src="${localStorage.getItem('perfilImage') || defaultPerfilImg}" alt="Imagen de perfil">
    </div>
    <div class="perfil__details">
      <h3>${localStorage.getItem('usuario-logeado') || 'Nombre predeterminado'}</h3>
      <p>${localStorage.getItem('usuario-logeado-mail') || 'Correo predeterminado'}</p>
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