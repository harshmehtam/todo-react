import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkboxes } from "../constant/hobbyLists";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { options } from "../constant/statusLists";

import "react-datepicker/dist/react-datepicker.css";

const HtmlForm = ({ type, edit, add, modeChange, editId: eId }) => {
  const [username, setUsername] = useState("");
  const [hobby, setHobby] = useState(checkboxes);
  const [age, setAge] = useState("");
  const [date, setDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const { todoList } = useSelector((state) => state.todo);

  useEffect(() => {
    const index = todoList.findIndex((e) => e._id === eId);
    let data = {};
    if (index !== -1) {
      data = todoList[index];
    }
    const {
      username = "",
      gender = "",
      date = new Date(),
      hobby = checkboxes,
      status = "",
      taskName = "",
      age = "",
    } = data;
    setUsername(username);
    setAge(age);
    setGender(gender);
    setDate(date);
    setHobby(hobby);
    setStatus(status);
    setTaskName(taskName);
  }, [eId]);

  const onCheckError = () => {
    if (username === "") {
      return setError({ userName: "Username is required" });
    } else if (age === "") {
      return setError({ age: "Age is required" });
    } else if (gender === "") {
      return setError({ gender: "Gender is required" });
    } else if (!hobby.length) {
      return setError({ hobby: "Hobby is required" });
    } else if (status === null) {
      return setError({ status: "Select Status is required" });
    } else if (taskName === "") {
      return setError({ taskName: "Task Name is required" });
    }
    setUsername("");
    setAge("");
    setGender("");
    setHobby(checkboxes.map((el) => ({ ...el, checked: false })));
    setTaskName("");
    setStatus("");
    setDate(new Date());

    const Hobby = hobby.filter((el) => el.checked).map((el) => el.id);
    add({ username, age, hobby: Hobby, taskName, date, status, gender });
  };

  return (
    <div className="form">
      <h2>{type} Todo</h2>
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
          setUsername(e.target.value);
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
          value="m"
          checked={gender === "m"}
          onChange={(e) => {
            setGender(e.target.value);
            setError(null);
          }}
        />
        <label htmlFor="gender">FeMale</label>
        <input
          type="radio"
          name="gender"
          value="f"
          checked={gender === "f"}
          onChange={(e) => {
            setGender(e.target.value);
            setError(null);
          }}
        />
      </div>
      {error?.gender ? (
        <label style={{ color: "red" }}>{error.gender}</label>
      ) : null}
      <h3>Hobby</h3>
      <div className="form-hobby">
        {hobby.map((checkbox) => (
          <label key={checkbox.id}>
            {checkbox.text}
            <input
              type="checkbox"
              onChange={() => {
                //onCheckBoxChange(checkbox.id);
                const curr = [...hobby];
                curr[checkbox.id].checked = !curr[checkbox.id].checked;
                setHobby([...curr]);
                setError(null);
              }}
              checked={checkbox.checked}
              // selected={hobby.includes(checkbox.id)}
            />
          </label>
        ))}
      </div>
      {error?.hobby ? (
        <label style={{ color: "red" }}>{error.hobby}</label>
      ) : null}
      <h3>Age</h3>
      <input
        type="range"
        min="18"
        max="55"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
          setError(null);
        }}
        step="1"
      />
      {error?.age ? <label style={{ color: "red" }}>{error.age}</label> : null}
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
          setError(null);
        }}
      ></input>
      {error?.taskName ? (
        <label style={{ color: "red" }}>{error.taskName}</label>
      ) : null}
      <Select
        onChange={(selected) => {
          setStatus(selected);
          setError(null);
        }}
        options={options}
      />
      {error?.status ? (
        <label style={{ color: "red" }}>{error.status}</label>
      ) : null}
      {type === "Add" ? (
        <button
          disabled={error}
          type="button"
          className="button"
          onClick={onCheckError}
        >
          Add
        </button>
      ) : (
        <>
          <button
            type="button"
            disabled={error}
            className="button"
            onClick={() => {
              onCheckError();
              edit();
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="button"
            onClick={() => {
              modeChange("Add");
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};
export default HtmlForm;
