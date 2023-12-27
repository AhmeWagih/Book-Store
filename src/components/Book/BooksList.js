import React from "react";
const BooksList = ({
  loading,
  books,
  isLoggedIn,
  deleteBook,
  dispatch,
  getBookId,
}) => {
  const bookList =
    books.length > 0
      ? books.map((items) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={items.id}
          >
            <div>{items.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary mr-3"
                // disabled={!isLoggedIn}
                onClick={() => getBookId(items.id)}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(items))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      // handle result here
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      // handle error here
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "There is no books available!";
  return (
    <div>
      <h2>Books List</h2>
      {loading ? "Loading....." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
