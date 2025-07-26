import './index.css';

const Books = [
  { title: '1984', author: 'George Orwell', year: 1949 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
];

export default function App() {
  return (
    <div className='App'>
      <Form />
      <BookList />
      <Stats />
    </div>
  );
}

function Form() {
  return (
    <div className='wrapper form-wrapper'>
      <h1>List of books you want to read</h1>
      <form className='book-form'>
        <input type='text' placeholder='Enter book title' />
        <input type='text' placeholder='Enter book author' />
        <input type='text' placeholder='Enter book year of publication' />
        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
}

function BookList() {
  return (
    <div className='wrapper book-list-wrapper'>
      <h2>Books:</h2>
      <ul className='book-list'>
        {Books.map((book) => (
          <BookItem book={book} key={book.title} />
        ))}
      </ul>
    </div>
  );
}

function BookItem({ book }) {
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
        <button>Remove</button>
      </div>
    </li>
  );
}

function Stats() {
  return (
    <footer className='footer'>
      <p>You have read x books out of x books.</p>
    </footer>
  );
}
