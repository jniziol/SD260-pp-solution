import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf'
import Search from "./Search"
import {Switch, Route, Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({books});
      });
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(prevState => {
          const bookIndex = prevState.books.findIndex(bookEle => book === bookEle);
          if (bookIndex > 0) {
            const bookClone = {...prevState.books[bookIndex], shelf};
            const clonedState = [...prevState.books];
            clonedState.splice(bookIndex, 1, bookClone);
            return {books: clonedState};
          } else {
            return {books: [...prevState.books, {...book, shelf}]};
          }
        });
      })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/search">
            <Search updateBookShelf={this.updateBookShelf}/>
          </Route>

          <Route exact path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {[["Currently Reading", "currentlyReading"],["Want To Read", "wantToRead"],["Read", 'read']].map(shelf => (
                    <BookShelf
                      bookShelfTitle={shelf[0]}
                      books={this.state.books.filter(book => book.shelf === shelf[1])}
                      updateBookShelf={this.updateBookShelf}
                      key={shelf[1]}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          </Route>
         </Switch>
      </div>
    )
  }
}

export default BooksApp
