import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (data, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3005/Books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error.massage);
    }
  }
);
export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectedWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.username = getState().auth.name;
      // dispatch(deleteBook({ id: 6 }));
      const res = await fetch("http://localhost:3005/Books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
      });
      const data = await res.json();
      dispatch(
        logInsert({
          name: "insertBook",
          status: "success",
        })
      );
      return data;
    } catch (error) {
      dispatch(
        logInsert({
          name: "insertBook",
          status: "faild",
        })
      );
      return rejectedWithValue(error.massage);
    }
  }
);
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (items, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/Books/${items.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
      });
      return items;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
export const readBook = createAsyncThunk(
  "book/readBook",
  async (items, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/Books/${items.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
      });
      return items;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], loading: false, error: null, bookInfo: null },
  extraReducers: (builder) => {
    builder
      //////////////////////////////////////////
      .addCase(getBooks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // console.log(action);
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        // console.log(action);
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(action);
      })
      //////////////////////////////////////////
      .addCase(insertBook.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(insertBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////////////////////////////////////////////
      .addCase(deleteBook.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(readBook.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readBook.fulfilled, (state, action) => {
        state.loading = false;
        state.bookInfo = action.payload;
      })
      .addCase(readBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
