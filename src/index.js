let addToy = false
var allToys = null
var currentToy = null

fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    allToys = data;
      putAllToysOnPage();
  });
  function makeToyForHTML(toy) {
      let newDiv = document.createElement('div');
      let newH = document.createElement('h2');
      let newImg = document.createElement('img');
      let newP = document.createElement('p');
      let newBtn = document.createElement('button');
      newH.textContent = toy.name;
      newDiv.className = "card";
      newImg.src = toy.image;
      newImg.className = "toy-avatar";
      newP.textContent = toy.likes;
      newBtn.className = "like-btn";
      newBtn.textContent = "Like <3";
      newDiv.appendChild(newH);
      newDiv.appendChild(newImg);
      newDiv.appendChild(newP);
      newDiv.appendChild(newBtn);
      // newDiv.appendChild();
      addEventListenerForCard(newBtn, newP)
      return newDiv;
  }
  function addEventListenerForCard(btnId, p) {
    btnId.addEventListener("click", e => {
     
      p.textContent++; 
      console.log(p);
    })
  }
  function putAllToysOnPage() {
    for (const toy of allToys) {
      let formattedDiv = makeToyForHTML(toy);
      let toysContainer = document.getElementById('toy-collection');
      toysContainer.appendChild(formattedDiv);
    }
  }
  function putToyOnPage(toy) {
    let newDiv = makeToyForHTML(toy);
    let toysContainer = document.getElementById('toy-collection');
    toysContainer.appendChild(newDiv);
  }
  function postToy(newToyObject) {
    fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    newToyObject
  })
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
  let newToyForms = document.getElementsByClassName('add-toy-form');
  let newToyForm = newToyForms[0];
  newToyForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const newToy = {};
     newToy["name"] = e.target.name.value;
     newToy["image"] = e.target.image.value;
      newToy["likes"] = 0;
      postToy(newToy);
      putToyOnPage(newToy);
      e.target.name.value = "";
      e.target.image.value = "";
      
  })
  // putAllToysOnPage(allToys);
})


