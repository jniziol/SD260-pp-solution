import React from 'react';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import Book from './Book'

class Search extends React.Component {

  state = {
    query: "",
    books: []
  }

  updateQuery = e => {
    this.setState({query: e.target.value});
    BooksAPI.search(e.target.value)
      .then(result => {
        this.setState({books: result});
      });
  }

  render = () => {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.updateQuery} value={this.state.query}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.error.length === 0 ? this.state.books.map(book => (
              <Book book={book} updateBookShelf={this.props.updateBookShelf}/>
            )) : this.state.error}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;