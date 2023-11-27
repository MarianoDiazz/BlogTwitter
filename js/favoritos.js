const misFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const conteinerTweets = document.querySelector(".tweets-container");

function renderFavoritos() {
  conteinerTweets.innerHTML = '';

  if (misFavoritos.length > 0) {
    misFavoritos.forEach((tweetsFav) => {
      const tweetElement = createPost(tweetsFav);
      conteinerTweets.appendChild(tweetElement);
    });
  } else {
    mostrarMensajeSinFavoritos();
  }
}

function mostrarMensajeSinFavoritos() {
  const mensajeSinFavoritos = document.createElement('div');
  mensajeSinFavoritos.classList.add('sin-favoritos');

  mensajeSinFavoritos.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <h3>Aún no agregaste nada a favoritos</h3>
  `;

  conteinerTweets.appendChild(mensajeSinFavoritos);
}

function createPost(tweet) {
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
      <button class="tweet-action fav-action"><i class="fa-solid fa-bookmark"></i></button>
    </div>
  `;
const tweetDate = misFavoritos.map(tweet => tweet.date);

const tweetsOrdenadosDescendente = [...tweetDate].sort((a, b) => b + a);

tweetsOrdenadosDescendente.forEach(date => {
  console.log(date);
});

  const favButton = tweetElement.querySelector('.fav-action');

  favButton.addEventListener('click', () => {
    console.log("se hizo click");

    const tweetId = tweet.id;

    const updatedFavoritos = misFavoritos.filter(post => post.id !== tweetId);

    localStorage.setItem('favoritos', JSON.stringify(updatedFavoritos));

    renderFavoritos();

    Toastify({
      text: "Eliminado de favoritos",
      className: "info",
      style: {
        background: "red",
      }
    }).showToast();
  });

  return tweetElement;
}
renderFavoritos();
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