const form = document.querySelector('#form');
const ul = document.querySelector('#book-list');
const addBtn = document.querySelector('.addBtn');

//Get data from localstorage
const parsedData = JSON.parse(localStorage.getItem(('books')));
const books = parsedData;

// Display books on website
function displayBooks() {
    books.forEach((item) => {
        addBooktoArray(item);
    });
}

//Add book to browser
function addBooktoArray(item) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = `
    <h3 class="title">${item.title}</h3>
    <p class="author">${item.author}</p>
    <button class="removeBtn">Remove</button><hr>`;

    ul.appendChild(li);
}

//Event to display books in browser
document.addEventListener('DOMContentLoaded', displayBooks);


//Event to Add a book to the array
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Getting input fields from the browser
    const title = form.elements.title;
    const author = form.elements.author;

    //getting the values of both input fields
    const titleValue = title.value;
    const authorValue = author.value;

    //create book
    const book = {
        title: titleValue,
        author: authorValue
    };

    //add book object to array
    books.push(book);
    addBooktoArray(book);

    //convert books array into string
    const booksStr = JSON.stringify(books);
    localStorage.setItem('books', booksStr);
});