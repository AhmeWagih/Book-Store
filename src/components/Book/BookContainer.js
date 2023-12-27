import React, { Fragment, useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook } from "../../store/bookSlice";
import "./book.css";

const BookContainer = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { loading, books } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  const getBookId = (id) => {
    const seletedBook = books.find((item) => item.id === id);
    // console.log(seletedBook);
    setSelectedBook((prev) => {
      return { ...prev, ...seletedBook };
    });
  };
  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            loading={loading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBookId={getBookId}
          />
        </div>
        <div className="col side-line">
          <BookInfo loading={loading} info={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default BookContainer;
