import React from 'react';
import Book from './Book'

export default function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <Book key={book.id} book={book} updateBookShelf={props.updateBookShelf}/>
          ))}
        </ol>
      </div>
    </div>
  )
}


