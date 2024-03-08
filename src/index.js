let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//GET//

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    const toyCollectionDiv = document.querySelector('#toy-collection');
    data.map(toy => {
      const cardDiv = document.createElement('div');

      cardDiv.className = 'card';

      const cardContent = document.createElement('div');

      const toyName = document.createElement('h2');
      toyName.textContent = toy.name;
      cardContent.appendChild(toyName);

      const toyImage = document.createElement('img');
      toyImage.src = toy.image;
      toyImage.className = 'toy-avatar';
      cardContent.appendChild(toyImage);

      const toyLikes = document.createElement('p');
      toyLikes.textContent = `Likes: ${toy.likes}`;
      cardContent.appendChild(toyLikes);

      const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.id = toy.id;
    cardContent.appendChild(likeBtn);
    let newNumberOfLikes = toy.likes;
    likeBtn.addEventListener('click', event => {
      console.log("hello")
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes += 1
      })
      })
        .then(response => response.json())
        .then(data => {
          toyLikes.textContent = `Likes: ${newNumberOfLikes}`
        })
        .catch(error => {
        });
    })
      cardDiv.appendChild(cardContent);
      toyCollectionDiv.appendChild(cardDiv);
    });
  });

  //POST//
document.getElementsByClassName("add-toy-form")[0].addEventListener('submit', function addToy(eventObject){
  eventObject.preventDefault()
  let toyName = document.getElementsByClassName("input-text")[0]
  let toyImg = document.getElementsByClassName("input-text")[1]
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": toyName.value,
    "image": toyImg.value,
    "likes": 0
  })
}) .then(response => response.json())
   .then(function(toy){
    const toyCollectionDiv = document.querySelector('#toy-collection');

    const cardDiv = document.createElement('div');

    cardDiv.className = 'card';

    const cardContent = document.createElement('div');

    const toyName = document.createElement('h2');
    toyName.textContent = toy.name;
    cardContent.appendChild(toyName);

    const toyImage = document.createElement('img');
    toyImage.src = toy.image;
    toyImage.className = 'toy-avatar';
    cardContent.appendChild(toyImage);

    const toyLikes = document.createElement('p');
    toyLikes.textContent = `Likes: ${toy.likes}`;
    cardContent.appendChild(toyLikes);

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.id = toy.id;
    cardContent.appendChild(likeBtn);
    let newNumberOfLikes = toy.likes;
    likeBtn.addEventListener('click', event => {
      console.log("hello")
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes += 1
      })
      })
        .then(response => response.json())
        .then(data => {
          toyLikes.textContent = `Likes: ${newNumberOfLikes}`
        })
        .catch(error => {
        });
    })

    cardDiv.appendChild(cardContent);
    toyCollectionDiv.appendChild(cardDiv);
   })
})