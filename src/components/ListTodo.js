import React, { useEffect, useState } from "react";
import useModal from "../Hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, listTodo } from "../store/todo-slice";

import "react-datepicker/dist/react-datepicker.css";
import { checkboxes } from "../constant/hobbyLists";

const ListTodo = ({ modeChange, onEditToggle }) => {
  const { hide, show, Modal } = useModal();
  const [deleteId, setDeleteId] = useState();
  const { todoList } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTodo());
  }, []);

  const onDelete = async () => {
    const response = await dispatch(deleteTodo(deleteId));
    if (response.type === "todo/deleteTodo/fulfilled") {
      dispatch(listTodo());
    }
  };

  return (
    <>
      <ul className="todos">
        {todoList.map(
          ({ _id, username, hobby, gender, age, date, taskName, status }) => {
            const h = hobby.map((el) => {
              const index = checkboxes.findIndex((e) => e.id === el);
              if (index !== -1) {
                return checkboxes[index].text;
              }
            });
            return (
              <li className="flex" key={_id}>
                <span className="todo-item">{username}</span>
                <span className="todo-item">{h.join(" ")}</span>
                <span className="todo-item">{gender}</span>
                <span className="todo-item">{age}</span>
                <span className="todo-item">
                  {new Date(date).toLocaleDateString()}
                </span>{" "}
                <span className="todo-item">{taskName}</span>
                <span className="todo-item">{status ? "Active" : "InActive"}</span>
                <span
                  className="todo-item"
                  onClick={() => {
                    onEditToggle(_id);
                    modeChange("Update");
                  }}
                >
                  Edit
                </span>{" "}
                <span
                  className="todo-item"
                  onClick={() => {
                    show();
                    setDeleteId(_id);
                  }}
                >
                  Delete
                </span>
              </li>
            );
          }
        )}
      </ul>
      <Modal>
        <div className="modal-content">
          <div className="modal-header">Are You Sure You Want to Delete?</div>
          <div className="modal-footer">
            <button
              onClick={() => {
                onDelete();
                hide();
              }}
            >
              Delete
            </button>
            &nbsp;
            <button onClick={hide}>Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListTodo;
