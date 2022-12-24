import React, { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import ListTodo from "./components/ListTodo";

function App() {
  const [mode, setMode] = useState("Add");
  const [editId, setEditId] = useState(null);

  const modeChange = (val) => {
    setMode(val);
  };

  const onEditToggle = (val) => {
    setEditId(val);
  };

  return (
    <>
      <div className="App">
        <Todo mode={mode} modeChange={modeChange} editId={editId} />
      </div>
      <div className="ListTodo">
        <ListTodo modeChange={modeChange} onEditToggle={onEditToggle} />
      </div>      
    </>
  );
}
export default App;
