let addToy = false;

function showToys(toys) {
  toys.map(toy => {
    appendToy(toy)
  })
}

function appendToy(toy){
  const toyCollection = document.querySelector("#toy-collection");
  const div = createToyCard(toy);
  toyCollection.appendChild(div);
}

function createToyCard(toy) {
  const div = document.createElement("div");
  div.className = "card";

  const h2 = document.createElement('h2');
  h2.innerText = toy.name;

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = 'toy-avatar';

  const p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;
  p.id = `toy${toy.id}`

  const likebtn = document.createElement("button");
  likebtn.className = "like-btn";
  likebtn.id = `${toy.id}`
  likebtn.innerText = "like";
  likebtn.addEventListener("click", (e) => {
    increaseLike(e)
  })

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(likebtn);

  return div;
}

function increaseLike(e) {
  e.preventDefault();
  let curr = document.querySelector(`#toy${e.target.id}`)

  let newLike = parseInt(curr.innerHTML) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLike
    })
  })
  .then(res => res.json())
  .then(() => {
    curr.innerText = `${newLike} likes`;
  })
}

fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
  .then(data => {
    showToys(data)
  })

function createToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      appendToy(data);
    });
  } 


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  const addToyForm = document.querySelector(".add-toy-form");
  addToyForm.addEventListener("submit", function(e){
    e.preventDefault();
    createToy({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    });
    e.target.reset();
    toyForm.style.display = 'none'
  });

});
