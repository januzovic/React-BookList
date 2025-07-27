import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  function handleAddBook(book) {
    setBooks((books) => [...books, book]);
  }

  function handleDeleteBook(id) {
    setBooks((books) => books.filter((book) => book.id !== id));
  }

  function handleToggleRead(id) {
    setBooks((books) =>
      books.map((book) =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
  }
  return (
    <div className='App'>
      <Form onAddBook={handleAddBook} />
      <BookList
        books={books}
        onDeleteBook={handleDeleteBook}
        onToggleRead={handleToggleRead}
      />
      <Stats books={books} />
    </div>
  );
}

function Form({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newBook = {
      title: title,
      author: author,
      year: year,
      read: false,
      id: Date.now(),
    };
    onAddBook(newBook);
    console.log(newBook);

    setTitle('');
    setAuthor('');
    setYear('');
  }
  return (
    <div className='wrapper form-wrapper'>
      <h1>List of books you want to read</h1>
      <form className='book-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter book title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter book author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter book year of publication'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
}

function BookList({ books, onDeleteBook, onToggleRead }) {
  const [sortBy, setSortBy] = useState('input');

  let bookItems;

  if (books.length === 0) {
    return (
      <div className='wrapper book-list-wrapper'>
        <p>No books added yet. Please enter a book that you want to read.</p>
      </div>
    );
  }
  // if (sortBy === 'input') {
  //   bookItems = books;
  // }
  // if (sortBy === 'title') {
  //   bookItems = books.slice().sort((a, b) => a.title.localeCompare(b.title));
  // }
  // if (sortBy === 'title-2') {
  //   bookItems = books.slice().sort((a, b) => b.title.localeCompare(a.title));
  // }
  // if (sortBy === 'read') {
  //   bookItems = books.slice().sort((a, b) => Number(a.read) - Number(b.read));
  // }
  // if (sortBy === 'year') {
  //   bookItems = books.slice().sort((a, b) => Number(b.year) - Number(a.year));
  // }
  // if (sortBy === 'year-2') {
  //   bookItems = books.slice().sort((a, b) => Number(a.year) - Number(b.year));
  // }

  const sortFunctions = {
    input: (books) => books,
    title: (books) =>
      books.slice().sort((a, b) => a.title.localeCompare(b.title)),
    titleSecond: (books) =>
      books.slice().sort((a, b) => b.title.localeCompare(a.title)),
    read: (books) =>
      books.slice().sort((a, b) => Number(a.read) - Number(b.read)),
    year: (books) =>
      books.slice().sort((a, b) => Number(b.year) - Number(a.year)),
    yearSecond: (books) =>
      books.slice().sort((a, b) => Number(a.year) - Number(b.year)),
  };

  bookItems = sortFunctions[sortBy] ? sortFunctions[sortBy](books) : books;

  return (
    <div className='wrapper book-list-wrapper'>
      <h2>Books:</h2>
      <ul className='book-list'>
        {bookItems.map((book) => (
          <BookItem
            book={book}
            key={book.title}
            onDeleteBook={onDeleteBook}
            onToggleRead={onToggleRead}
          />
        ))}
      </ul>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value='input'>Input Order</option>
        <option value='title'>Title (A-Z)</option>
        <option value='titleSecond'>Title (Z-A)</option>
        <option value='read'>Read</option>
        <option value='year'>Year (Newest)</option>
        <option value='yearSecond'>Year (Oldest)</option>
      </select>
    </div>
  );
}

function BookItem({ book, onDeleteBook, onToggleRead }) {
  return (
    <li className={`book-item ${book.read ? 'read' : ''}`}>
      <input
        type='checkbox'
        checked={book.read}
        onChange={() => onToggleRead(book.id)}
      />
      <div className='book-wrapper'>
        <h3>
          Book name: <em>{book.title}</em>
        </h3>
        <p>
          Book author: <em>{book.author}</em>
        </p>
        <p>
          Year of publication: <em>{book.year}</em>
        </p>
        <button onClick={() => onDeleteBook(book.id)}>Remove</button>
      </div>
    </li>
  );
}

function Stats({ books }) {
  return (
    <footer className='footer'>
      {books.filter((book) => book.read).length === books.length ? (
        <p>All books read!</p>
      ) : (
        <p>
          You have read {books.filter((book) => book.read).length} books out of{' '}
          {books.length} books.
        </p>
      )}
    </footer>
  );
}
