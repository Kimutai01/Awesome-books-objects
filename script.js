function Book(title, author) {
  this.title = title;
  this.author = author;
}
const findBook = () => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
};
const addBook = (book) => {
  const books = findBook();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};
const removeBook = (title) => {
  const books = findBook();
  books.forEach((book, i) => {
    if (book.title === title) {
      books.splice(i, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
};

const deleteBook = (el) => {
  if (el.classList.contains('delete')) {
    el.parentElement.remove();
  }
};
const addBookToList = (book) => {
  const listI = document.querySelector('.list');
  const ulI = document.createElement('ul');

  ulI.innerHTML = `
      <li>${book.title}</li>
      <li>${book.author}</li>
      <button class="delete">remove</button>
      `;
  listI.appendChild(ulI);
};

const displayBook = () => {
  const books = findBook();

  books.forEach((book) => addBookToList(book));
};

document.addEventListener('DOMContentLoaded', displayBook());

document.querySelector('.book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    alert('Please fill the fields');
  } else {
    const book = new Book(title, author);
    addBookToList(book);
    addBook(book);
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
});

document.querySelector('.list').addEventListener('click', (e) => {
  deleteBook(e.target);
  removeBook(e.target.parentElement.firstElementChild.textContent);
});
