import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "http://localhost:8000/api"

const initialState = {
  todoList: [],
  status: "idle",
  error: "",
};

export const listTodo = createAsyncThunk("todo/getTodo", async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/todo");
    const data = await response.json();
    return data;
  } catch (err) {
    // You can choose to use the message attached to err or write a custom error
    return "Opps there seems to be an error";
  }
});

export const addTodo = createAsyncThunk("todo/addTodo", async (payload) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/todo",
      payload
    );
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
      const response = await axios.put(
        `http://127.0.0.1:8000/api/todo/${id}`,
        payload
      );
      const data = await response.json();
      return data;
    } catch (err) {
      // You can choose to use the message attached to err or write a custom error
      return "Opps there seems to be an error";
    }
  }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/todo/${id}`);
    const data = await response.json();
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
        console.log("1");
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log("2");
        state.status = "succeeded";
        // state.todoList = state.todoList.concat(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        console.log("3");
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        console.log("=> ", action?.payload);
        if (!action?.payload.response.id) {
          console.log("could not update");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload.response;
        const index = state.todoList.findIndex((post) => post.id === id);
        state.todoList[index] = { id, ...action.payload.response };
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        if (!action?.payload.id) {
          console.log("could not delete");
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        const OldPosts = state.todoList.filter((post) => post.id !== id);
        state.todoList = OldPosts;
      });
  },
});

export default todoSlice.reducer;
