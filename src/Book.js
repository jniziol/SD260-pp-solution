import React from 'react';

export default function Book(props) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: props.book.imageLinks !== undefined ? `url(${props.book.imageLinks.thumbnail})` : "none" }}></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={(e) => props.updateBookShelf(props.book, e.target.value)} >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors !== undefined ? props.book.authors.join(", ") : ""}</div>
      </div>
    </li>
  )
}