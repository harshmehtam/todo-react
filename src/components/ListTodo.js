import React, { useEffect, useState } from "react";
// import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../store/todo-slice";
import { listTodo } from "../store/todo-slice";
import { checkboxes } from "../constant/hobbyLists";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ListTodo = (props) => {
  const { todoList } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [hobby, setHobby] = useState([]);
  const [age, setAge] = useState("");
  const [date, setDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [gender, setGender] = useState("");
  const [editId, setEditId] = useState("");

  const onEditToggle = (
    id,
    { username, age, date, hobby, taskName, gender }
  ) => {
    setEditing(true);
    setEditId(id);
    setUsername(username);
    setHobby(hobby);
    setDate(date);
    setTaskName(taskName);
    setGender(gender);
    setAge(age);
    props.hideAddTodo(true);
  };

  const edit = () => {
    // if (content === "") {
    //   setState({ ...state, contentError: "You must write something!" });
    //   return;
    // }
    dispatch(
      editTodo(editId, { username, age, gender, taskName, hobby, date })
    );
    setEditing(false);
  };

  useEffect(() => {
    dispatch(listTodo());
  }, []);

  const onCheckBoxChange = (id) => {
    const allHobby = [...hobby];
    const findIdx = allHobby.indexOf(id);

    if (findIdx > -1) {
      allHobby.splice(findIdx, 1);
    } else {
      allHobby.push(id);
    }

    setHobby(allHobby);
  };

  return (
    <div>
      {isEditing ? (
        <div className="form">
          <h2>Update Todo</h2>
          <h3>UserName</h3>
          <input
            type="text"
            value={username}
            placeholder="username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <h3>Gender</h3>
          <div className="form-gender">
            <label htmlFor="gender">Male</label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="gender">FeMale</label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <h3>Hobby</h3>
          <div className="form-hobby">
            {checkboxes.map((checkbox) => (
              <label key={checkbox.id}>
                {checkbox.text}
                <input
                  type="checkbox"
                  onChange={() => onCheckBoxChange(checkbox.id)}
                  selected={hobby.includes(checkbox.id)}
                />
              </label>
            ))}
          </div>
          <h3>Age</h3>
          <input
            type="range"
            min="8"
            max="55"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            step="1"
          />
          <h3>Date</h3>
          <DatePicker
            selected={new Date(date)}
            onChange={(date) => setDate(date)}
          />
          <h3>Task Name</h3>
          <input
            type="text"
            value={taskName}
            placeholder="taskName"
            name="taskName"
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          ></input>
          <button type="button" className="button" onClick={edit}>
            Edit
          </button>
          <button
            type="button"
            className="button"
            onClick={() => {
              setEditing(false);
              props.hideAddTodo(false);
            }}
          >
            Cancel
          </button>
          {/* {contentError ? <div className="error">{contentError}</div> : null} */}
        </div>
      ) : (
        <ul className="todos">
          {todoList.map(
            ({ _id, username, hobby, gender, age, date, taskName }) => {
              return (
                <li className="grid" key={_id}>
                  <span className="content">{username}</span>
                  <span
                    onClick={() =>
                      onEditToggle(_id, {
                        username,
                        hobby,
                        gender,
                        age,
                        date,
                        taskName,
                      })
                    }
                  >
                    Edit
                  </span>
                  <span>Delete</span>
                  {/* <span className="todo-action">
                  <AiOutlineCloseCircle
                    className="close"
                    onClick={() => dispatch(
                      // deleteToDo({ id })
                      )
                    }
                  />
                  <AiFillEdit
                    className="edit"
                    onClick={() => {}
                      // onEditToggle(id, content)
                    }
                  />
                </span> */}
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
};
export default ListTodo;
