import { useState } from 'react';
import './index.css';

const Books = [
  { title: '1984', author: 'George Orwell', year: 1949 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
];

export default function App() {
  const [books, setBooks] = useState([]);

  function handleAddBook(book) {
    setBooks((books) => [...books, book]);
  }

  function handleDeleteBook(id) {
    setBooks((books) => books.filter((book) => book.id !== id));
  }
  return (
    <div className='App'>
      <Form onAddBook={handleAddBook} />
      <BookList books={books} onDeleteBook={handleDeleteBook} />
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

function BookList({ books, onDeleteBook }) {
  let bookItems = books;

  return (
    <div className='wrapper book-list-wrapper'>
      <h2>Books:</h2>
      <ul className='book-list'>
        {bookItems.map((book) => (
          <BookItem book={book} key={book.title} onDeleteBook={onDeleteBook} />
        ))}
      </ul>
    </div>
  );
}

function BookItem({ book, onDeleteBook }) {
  return (
    <li className='book-item'>
      <input type='checkbox' />
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
      <p>
        You have read {books.filter((book) => book.read).length} books out of{' '}
        {books.length} books.
      </p>
    </footer>
  );
}
