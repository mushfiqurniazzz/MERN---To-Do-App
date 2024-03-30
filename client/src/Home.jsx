import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs"; // Importing icons

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id, isChecked) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { done: isChecked })
      .then((result) => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, done: isChecked };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((result) => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="home">
        <h2>Todo List</h2>
        <Create />
        <br />
        {todos.length === 0 ? (
          <div>
            <h2>No Record</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div className="task" key={todo._id}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                checked={todo.done} // This ensures the checkbox state reflects the todo item's completion status
                onChange={(e) => handleEdit(todo._id, e.target.checked)} // Call handleEdit with todo id and checkbox state
              />
              {todo.done ? (
                <p className="line_through">{todo.task}</p>
              ) : (
                <p>{todo.task}</p>
              )}

              <div>
                <span onClick={() => handleDelete(todo._id)}>
                  <BsFillTrashFill className="icon" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Home;
