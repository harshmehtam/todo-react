import React from "react";
import { useDispatch } from "react-redux";
import { addTodo, listTodo, editTodo } from "../store/todo-slice";

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
  
  const edit = async (payload) => {
    const response = await dispatch(editTodo({ editId, ...payload }));
    modeChange("Add");
    if (response.type === "todo/editTodo/fulfilled") {
      dispatch(listTodo());
    }
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
