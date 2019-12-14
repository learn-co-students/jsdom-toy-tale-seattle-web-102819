let addToy = false
let globalDiv
const toyView = document.querySelector("#toy-collection")


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  fetch('http://localhost:3000/toys') 
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    createToyCard(json)
  })
  
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
  toyForm.addEventListener("submit", (event) => {
    const newToyName = event.target.name.value
    const newToyUrl = event.target.image.value
    // console.log(event)
    event.preventDefault()
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyUrl,
        likes: 0
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log(data)
      createOneCard(data)
      console.log(globalDiv)
    })


  })

  document.addEventListener("click", function(event) {
    // console.log(event.path[1].querySelector('p').textContent.split(" ")[0])
    let currentLikes = parseInt(event.path[1].querySelector('p').textContent.split(" ")[0]) + 1
    let currentItem = event.target
    if (event.target.classList == 'like-btn') {
    fetch(`http://localhost:3000/toys/${currentItem.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: currentLikes
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log(data)
      console.log(currentItem.parentNode.children[2])
      currentItem.parentNode.children[2].textContent = `${currentLikes} likes`
      // currentItem.likes.textContent = `${data.likes} likes`
    })
  }
  })

})

function createToyCard(json) {
  const toyView = document.querySelector("#toy-collection")
  json.forEach(toy => {
    const div = document.createElement('div')
    div.classList.add('card')
    globalDiv = toyView.appendChild(div)
    addInfoToCard(toy)
  })
}

function createOneCard(json) {
  console.log(json)
  const toyView = document.querySelector("#toy-collection")
  const div = document.createElement('div')
  div.classList.add('card')
  globalDiv = toyView.appendChild(div)
  addInfoToCard(json)
}

function addInfoToCard(toy) {
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  img.classList.add('toy-avatar')
  const p = document.createElement('p')
  const button = document.createElement('button')
  button.classList.add('like-btn')
  button.id = `${toy.id}`
  globalDiv.appendChild(h2).textContent = toy.name
  globalDiv.appendChild(img).src = toy.image
  globalDiv.appendChild(p).textContent = `${toy.likes} likes`
  globalDiv.appendChild(button).textContent = 'Like'
}

