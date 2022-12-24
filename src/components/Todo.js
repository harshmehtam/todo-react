import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, listTodo } from "../store/todo-slice";

import "react-datepicker/dist/react-datepicker.css";
import HtmlForm from "./Form";

const Todo = ({ mode, modeChange, editId }) => {
  const dispatch = useDispatch();

  const add = async (data) => {
    const { username, gender, hobby, date, taskName, age, status } = data;
    const response = await dispatch(
      addTodo({ username, gender, hobby, date, taskName, age, status })
    );
    if (response.type === "todo/addTodo/fulfilled") {
      dispatch(listTodo());
    }
  };

  const edit = () => {
    // if (content === "") {
    //   setState({ ...state, contentError: "You must write something!" });
    //   return;
    // }
    // dispatch(
    //   editTodo(editId, { username, age, gender, taskName, hobby, date })
    // );
    // setEditing(false);
  };

  return (
    <HtmlForm
      type={mode}
      add={add}
      edit={edit}
      modeChange={modeChange}
      editId={editId}
    />
  );
};
export default Todo;
