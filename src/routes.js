// create routing for the app
const { createBook, readAllBooks } = require('./handler');

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
];

module.exports = routes;
