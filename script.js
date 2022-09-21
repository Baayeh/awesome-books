const form = document.querySelector('#form');
const ul = document.querySelector('#book-list');

// if books !== null
let books;
if(localStorage.getItem('books') === null) {
  books = [];
} else {
  books = JSON.parse(localStorage.getItem('books'));
}

// Define Book Class
class Book {
  constructor(title, author) {
    this.title = title; // let title = title
    this.author = author; // let author = author
  }
}

// Define Methods class
class methods { 
  // Add book to browser
  addBooktoArray(item, index) {
    const li = document.createElement('li');
    li.classList.add('list-item');

    // add key attribute with value of index (key = index)
    li.setAttribute('key', index);
    li.innerHTML = `
    <h3 class="title">${item.title}</h3>
    <p class="author">${item.author}</p>
    <button class="removeBtn">Remove</button><hr>`;

    ul.appendChild(li);
  }

  // remove book
 removeBook(element) {
  if (element.classList.contains('removeBtn')) {
    // get parent element of button and remove it from the browser
      element.parentElement.remove();

      const bookID = element.parentElement.getAttribute('key');
      const result = books.filter((book) => book !== books[bookID]);

      // convert result into string and store new data in localStorage
      const filteredData = JSON.stringify(result);
      localStorage.setItem('books', filteredData);
    }
  }
}

//Create an instance of methods class
const method = new methods();

// Display books on website
function displayBooks() {
  books.forEach((item, index) => {
    method.addBooktoArray(item, index);
  });
}

// Event to display books in browser
document.addEventListener('DOMContentLoaded', displayBooks);

// Event to Add a book to the array
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Getting input fields from the browser
  const [title, author] = form.elements;

  // getting the values of both input fields
  const titleValue = title.value;
  const authorValue = author.value;

  // add book when fields are not empty
  if (titleValue !== '' || authorValue !== '') {
    // create book object
    const book = new Book(titleValue, authorValue);
    
    // add book object to array
    books.push(book);
    method.addBooktoArray(book);

    // convert books array into string and store in localStorage
    const booksStr = JSON.stringify(books);
    localStorage.setItem('books', booksStr);
    form.reset();
  }
});

// Event to remove book
ul.addEventListener('click', (e) => {
  // getting element that is clicked in the ul
  method.removeBook(e.target);
});
