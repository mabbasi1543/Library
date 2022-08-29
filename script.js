const book1 = new Book('a', 'a',10);
const book2 = new Book('b', 'b',10);
const book3 = new Book('c', 'c',10);
const book4 = new Book('d', 'd',10);
const book5 = new Book('e', 'e',10);
const book6 = new Book('f', 'f',10);




let myLibrary = [ book1,book2,book3,book4,book5,book6];


function Book(title , author , pages , read = true) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.pages = pages;
  this.toggleRead = function (){
    this.read = !this.read;
  }
}




function render(library){
  const books = document.getElementById("books");
  books.innerText = "";
  for (let i = 0 ; i < library.length ; i++){
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute('id', `book${i}`);

    let title = document.createElement('p');
    title.appendChild( document.createTextNode(`title : ${library[i].title}`));

    let author = document.createElement('p');
    author.appendChild( document.createTextNode(`Author : ${library[i].author}`));

    let read = document.createElement('p');
    read.appendChild( document.createTextNode(`read : ${library[i].read ? 'yes' : 'no'}`));

    let page = document.createElement('p');
    page.appendChild( document.createTextNode(`page : ${library[i].pages}`));

    let readBtn = document.createElement('button');
    readBtn.setAttribute('data-index', `${i}`);
    readBtn.classList.add("readBtn");
    readBtn.innerHTML = library[i].read?"unread" : "read";
    readBtn.onclick = function(e) {
      myLibrary[i].toggleRead();
      render(myLibrary)
    }


    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('data-index', `${i}`);
    removeBtn.classList.add("removeBtn");
    removeBtn.innerHTML = "Remove";
    removeBtn.onclick = function(e) {
      console.log(e.target.dataset.index)
      myLibrary.splice(e.target.dataset.index, 1);
      render(myLibrary)
    }


    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(read);
    card.appendChild(page);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);

    books.appendChild(card);
  }

  let cardAdd = document.createElement("div");
  cardAdd.classList.add("card");
  cardAdd.setAttribute('id', 'add');
  let addBtn = document.createElement('button');
  addBtn.setAttribute('id', 'addBtn');
  addBtn.appendChild( document.createTextNode('+'));
  cardAdd.appendChild(addBtn);
  books.appendChild(cardAdd);
  addBtn.onclick = function() {
    modal.style.display = "block";
  }
}
render(myLibrary)
function addBookToLibrary(title,author,pages,read) {
  // do stuff here
  const booktemp = new Book(title,author,pages,read);
  myLibrary.push(booktemp);
  render(myLibrary);
}

function submit(e) {
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  let read
  formProps.read == "on" ? read = true : read = false;
  addBookToLibrary(formProps.title,formProps.author,formProps.pages,read)
  document.getElementById("modal").style.display = "none";
  e.preventDefault();
  document.getElementById("form").reset()
}

const form = document.getElementById('form');
form.addEventListener('submit', e => submit(e));


// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("addBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
