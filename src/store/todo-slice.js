import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/todo";

const initialState = {
  todoList: [],
  status: "idle",
  error: "",
};

export const listTodo = createAsyncThunk("todo/getTodo", async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (err) {
    // You can choose to use the message attached to err or write a custom error
    return "Opps there seems to be an error";
  }
});

export const addTodo = createAsyncThunk("todo/addTodo", async (payload) => {
  try {
    const response = await axios.post(BASE_URL, payload);
    const data = response.data;
    return data;
  } catch (err) {
    // You can choose to use the message attached to err or write a custom error
    return "Opps there seems to be an error";
  }
});

export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async (id, payload) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, payload);
      const data = await response.data;
      return data;
    } catch (err) {
      // You can choose to use the message attached to err or write a custom error
      return "Opps there seems to be an error";
    }
  }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    const data = await response.data;
    return data;
  } catch (err) {
    // You can choose to use the message attached to err or write a custom error
    return "Opps there seems to be an error";
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(listTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoList = action.payload.response;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        if (!action?.payload.response.id) {
          console.log("could not update");
          console.log(action.payload);
          return;
        }
        // const { id } = action.payload.response;
        // const index = state.todoList.findIndex((post) => post.id === id);
        // state.todoList[index] = { id, ...action.payload.response };
      });
  },
});

export default todoSlice.reducer;
