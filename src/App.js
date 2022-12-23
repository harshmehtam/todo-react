import React, { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
function App() {
  const [hide, setHide] = useState(false);

  const hideTodo = (val) => {
    setHide(val);
  };

  return (
    <>
      <div className="App">
        <AddTodo hide={hide} />
      </div>
      <div className="ListTodo">
        <ListTodo hideAddTodo={hideTodo} />
      </div>
    </>
  );
}
export default App;
