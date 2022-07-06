// create routing for the app
const {
  createBook, readAllBooks, readBookById, updateBook, deleteBook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: createBook,
  },
  {
    method: 'GET',
    // query params
    path: '/books',
    handler: readAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: readBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;
