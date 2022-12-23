import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, listTodo } from "../store/todo-slice";
import DatePicker from "react-datepicker";
import { checkboxes } from "../constant/hobbyLists";

import "react-datepicker/dist/react-datepicker.css";

const AddTodo = (props) => {
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [gender, setGender] = useState("");
  const [hobby, setHobby] = useState([]);
  const [age, setAge] = useState("");
  const [date, setDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(null);

  const add = async () => {
    const response = await dispatch(
      addTodo({
        username: username,
        gender: gender,
        hobby: hobby,
        date: date,
        taskName: taskName,
      })
    );
    if (response.type === "todo/addTodo/fulfilled") {
      dispatch(listTodo());
    }
    setusername("");
    setAge("");
    setDate("");
    setGender("");
    setTaskName("");
    setHobby([]);
  };

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
    <div className="form">
      <h2>TODO</h2>
      <h3>UserName</h3>
      <input
        type="text"
        value={username}
        placeholder="username"
        name="username"
        onChange={(e) => {
          let reg = /^[A-Za-z ]+$/;
          if (reg.test(e.target.value)) {
            if (e.target.value.length > 16) {
              setError({ userName: "Maxmimum 15 character are allowed" });
            } else {
              setError(null);
            }
          } else if (e.target.value !== "") {
            setError({ userName: "Only Alphabet are allow's" });
          } else {
            setError({ userName: "Empty username is not allowed" });
          }
          setusername(e.target.value);
        }}
      ></input>
      {error?.userName ? (
        <label style={{ color: "red" }}>{error.userName}</label>
      ) : null}
      <h3>Gender</h3>
      <div className="form-gender">
        <label htmlFor="gender">Male</label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={(e) => {
            setGender(e.target.value);
          }}
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
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
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
      <button
        disabled={props.hide || error}
        type="button"
        className="button"
        onClick={add}
      >
        Add
      </button>
      {/* {contentError ? <div className="error">{contentError}</div> : null} */}
    </div>
  );
};
export default AddTodo;
