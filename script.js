/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

const form = document.querySelector('#form');
const ul = document.querySelector('#book-list');

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Methods {
 static books = [];

 static getAllBooks() {
   if (localStorage.getItem('books')) {
     this.books = JSON.parse(localStorage.getItem('books'));
     this.displayBooks();
   } else {
     ul.style.display = 'none';
   }
 }

 static displayBooks() {
   this.books.forEach((book) => {
     this.addToBookArray(book);
   });
 }

 static addToBookArray(book) {
   const li = `<li class="list-item" key="${book.id}">
  <p class="title">"${book.title}" by ${book.author}</p>
  <button class="removeBtn">Remove</button>
  </li>`;
   ul.innerHTML += li;
 }

 static addBook(book) {
   this.books.push(book);
   const strData = JSON.stringify(this.books);
   localStorage.setItem('books', strData);
 }

 static removeBook(bookID) {
   const result = this.books.filter((book) => String(bookID) !== String(book.id));
   const strData = JSON.stringify(result);
   localStorage.setItem('books', strData);
   this.books = JSON.parse(localStorage.getItem('books'));
   if (this.books.length !== 0) {
     ul.style.display = 'block';
   } else {
     ul.style.display = 'none';
     localStorage.clear();
   }
 }
}

document.addEventListener('DOMContentLoaded', Methods.getAllBooks());

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const [title, author] = form.elements;
  const titleValue = title.value;
  const authorValue = author.value;
  const book = new Book(titleValue, authorValue, Methods.books.length);
  ul.style.display = 'block';
  Methods.addBook(book);
  Methods.addToBookArray(book);
  form.reset();
});

ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('removeBtn')) {
    const bookID = e.target.parentElement.getAttribute('key');
    Methods.removeBook(bookID);
    e.target.parentElement.remove();
  }
});