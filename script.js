/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

const form = document.querySelector('#form');
const ul = document.querySelector('#book-list');

//Getting sections of The HTML
const contactSection = document.querySelector('#contact');
const contactLink = document.querySelector('#contact-link');
const list = document.querySelector('#list');
const addNew = document.querySelector('#add');

//remove the other sections when list link is clicked
list.addEventListener('click', () => {
  form.classList.add('display-section');
  contactSection.classList.add('display-section');

  
});

//remove other sections when add new is clicked
addNew.addEventListener('click', () => {
  ul.classList.add('display-section');
  contactSection.classList.add('display-section');
});

//remove other sections when contact is clicked
contactLink.addEventListener('click', () => {
  ul.classList.add('display-section');
  form.classList.add('display-section');
});

// Define Book Class
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// Define Methods Class
class Methods {
 // create books array to hold all books created
 static books = [];

 // get all books from the localStorage
 static getAllBooks() {
   // check if localStorage is not empty
   if (localStorage.getItem('books')) {
     this.books = JSON.parse(localStorage.getItem('books'));
     this.displayBooks();
   } else {
     ul.style.display = 'none';
   }
 }

 // display books to the browser
 static displayBooks() {
   this.books.forEach((book) => {
     this.addToBookUl(book);
   });
 }

 // create li with book properties and insert it to the ul tag
 static addToBookUl(book) {
   const li = `<li class="list-item" key="${book.id}">
  <p class="title">"${book.title}" by ${book.author}</p>
  <button class="removeBtn">Remove</button>
  </li>`;
   ul.innerHTML += li;
 }

 // add book to array and store it in localStorage
 static addBook(book) {
   // add book to the books array
   this.books.push(book);

   // convert the books array to a string
   const strData = JSON.stringify(this.books);

   // store the converted data in the localStorage
   localStorage.setItem('books', strData);
 }

 // remove book from localStorage
 static removeBook(bookID) {
   // filter out the deleted book and return the ones left
   const result = this.books.filter((book) => String(bookID) !== String(book.id));

   // convert the result to a string
   const strData = JSON.stringify(result);

   // store the converted result in the localStorage
   localStorage.setItem('books', strData);

   // assign the new results to the books array
   this.books = JSON.parse(localStorage.getItem('books'));

   // check if the books array is not empty
   if (this.books.length !== 0) {
     ul.style.display = 'block';
   } else {
     ul.style.display = 'none';
     localStorage.clear();
   }
 }
}

// Get all books from the localStorage anytime the page loads fully
document.addEventListener('DOMContentLoaded', Methods.getAllBooks());

// Add book to array when form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // getting elements in the form that has name value of title and author
  const [title, author] = form.elements;

  // getting the values of the title and author input fields
  const titleValue = title.value;
  const authorValue = author.value;

  // create book object from Book class and pass the form values to it
  const book = new Book(titleValue, authorValue, Methods.books.length);

  // display the ul tag
  ul.style.display = 'block';

  // add the new book object to the array and store it to the localStorage
  Methods.addBook(book);

  // insert the book in the ul tag
  Methods.addToBookUl(book);

  // clear the form values
  form.reset();
});

// remove book when remove button is clicked
ul.addEventListener('click', (e) => {
  // check if button clicked has a class of removeBtn
  if (e.target.classList.contains('removeBtn')) {
    // get the value of the key attribute of the parent element of the remove button
    const bookID = e.target.parentElement.getAttribute('key');

    // remove book from localStorage
    Methods.removeBook(bookID);

    // remove book from browser
    e.target.parentElement.remove();
  }
});
