const form = document.querySelector('#form');
const ul = document.querySelector('#book-list');

// Get data from localstorage
const parsedData = JSON.parse(localStorage.getItem(('books')));
const books = parsedData ? parsedData : [];

// Display books on website
function displayBooks() {
  books.forEach((item, index) => {
    addBooktoArray(item, index);
  });
}

// Add book to browser
function addBooktoArray(item, index) {
  const li = document.createElement('li');
  li.classList.add('list-item');
  li.setAttribute('key', index);
  li.innerHTML = `
  <h3 class="title">${item.title}</h3>
  <p class="author">${item.author}</p>
  <button class="removeBtn">Remove</button><hr>`;

  ul.appendChild(li);
}

// remove book
function removeBook(element) {
  if(element.classList.contains('removeBtn')) {
    element.parentElement.remove();
    let bookID = element.parentElement.getAttribute('key');
    const result = books.filter((book) => {
      return book !== books[bookID];
    });

    // convert result into string and store new data in localStorage
    let filteredData = JSON.stringify(result);
    localStorage.setItem('books', filteredData);
  }
}

// Event to display books in browser
document.addEventListener('DOMContentLoaded', displayBooks);

// Event to Add a book to the array
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Getting input fields from the browser
  const title = form.elements.title;
  const author = form.elements.author;

  // getting the values of both input fields
  const titleValue = title.value;
  const authorValue = author.value;

  // add book when fields are not empty
  if(titleValue !== '' || authorValue !== '') {
    
    // create book object
    const book = {
      title: titleValue,
      author: authorValue
    };

    // add book object to array
    books.push(book);
    addBooktoArray(book);

    // convert books array into string and store in localStorage
    const booksStr = JSON.stringify(books);
    localStorage.setItem('books', booksStr);
    form.reset();
  }
});

// Event to remove book
ul.addEventListener('click', (e) => {
  removeBook(e.target);
});
