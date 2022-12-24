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
          ({ _id, username, hobby, gender, age, date, taskName }) => {
            const h = hobby.map((el) => {
              const index = checkboxes.findIndex((e) => e.id === el);
              if (index !== -1) {
                return checkboxes[index].text;
              }
            });
            return (
              <li className="grid" key={_id}>
                <span className="content">{username}</span>
                <span className="hobby">{h.join(' ')}</span>
                <span className="gender">{gender}</span>
                <span className="age">{age}</span>
                <span className="date">{new Date(date).toLocaleDateString()}</span>
                <span className="taskName">{taskName}</span>
                <span
                  onClick={() => {
                    onEditToggle(_id);
                    modeChange("Update");
                  }}
                >
                  Edit
                </span>
                <span
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
