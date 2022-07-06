// create handler for the app
const { nanoid } = require('nanoid');
const book = require('./book');

// Create a new book
const createBook = (req, res) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;
  // other variable
  const id = nanoid(16);
  const finished = Boolean(readPage === pageCount);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  book.push(newBook);

  // validate name required
  if (!name) {
    const response = res.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // validate read page > page count
  if (readPage > pageCount) {
    const response = res.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // validate is book success to creted
  const successAdd = book.filter((b) => b.id === id).length > 0;
  if (successAdd) {
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // validate is book fail to creted
  const response = res.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Read all books
const readAllBooks = (req, res) => {
  // filter by name
  const { name, reading, finished } = req.query;
  if (name) {
    const bookName = book.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil ditampilkan',
      data: {
        books: bookName.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // filter by finished
  // if finished == 1
  if (Number(finished) === 1) {
    const bookFinished = book.filter((b) => b.finished === true);
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil ditampilkan',
      data: {
        books: bookFinished.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // if finished == 0
  if (Number(finished) === 0) {
    const bookFinished = book.filter((b) => b.finished === false);
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil ditampilkan',
      data: {
        books: bookFinished.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // filter by reading
  // query param reading == 1
  if (Number(reading) === 1) {
    const bookReading = book.filter((b) => b.reading === true);
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil ditampilkan',
      data: {
        books: bookReading.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // query param reading == 0
  if (Number(reading) === 0) {
    const bookReading = book.filter((b) => b.reading === false);
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil ditampilkan',
      data: {
        books: bookReading.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  const response = res.response({
    status: 'success',
    message: 'Buku berhasil ditampilkan',
    data: {
      // display some information about the books
      books: book.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

module.exports = { createBook, readAllBooks };
