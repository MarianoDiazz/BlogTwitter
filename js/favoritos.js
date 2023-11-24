const misFavotitos = JSON.parse(localStorage.getItem("favoritos")) || [];
console.log(misFavotitos);

const conteinerTweets = document.querySelector(".tweets-container");
misFavotitos.forEach((tweetsFav) => {
  const tweetElement = createPost(tweetsFav);
  conteinerTweets.appendChild(tweetElement);
});

function createPost(tweet) {
  const tweetElement = document.createElement("article");
  tweetElement.classList.add("tweet");

  tweetElement.innerHTML = `
    <div class="tweet-author">
      <img src="${tweet.perfilImg}" alt="${tweet.username}">
      <span class="author-name">${tweet.username}</span>
    </div>
    <p class="tweet-text">${tweet.content}</p>
    ${
      tweet.image
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
  return tweetElement
}
