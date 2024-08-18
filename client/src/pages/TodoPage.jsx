//I have created this page with special functonality like if the user doesn't have token save din the localstorage they will not be able to use this page the user would have to first log in then the token will be saved in their localstorage and only then it would be possible to acces this

//importing the necessary functions, and libraries
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/Todo.module.css";
import { useHistory } from "react-router-dom";
//the componenet function declaration
function TodoPage() {
  //verifing if the user have a token or not
  const token = localStorage.getItem("token");
  const history = useHistory();
  if (token == null || !token) {
    history.push("/login");
  }
  //declaring state for task and todos
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_PORT}/get`,
        {
          token: token,
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Fetch todos when component mounts
  //fetching the todos from the server with axios
  useEffect(() => {
    fetchTodos();
  }); // Empty dependency array to run once on mount
  //function for creating e todo with axios
  const handleAdd = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_PORT}/add`, {
        task: task,
        token: token,
      });
      setTask(""); // Clear input field after adding task
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  // function for marking the state of the todo true/false depending on it's id
  const handleEdit = async (id, isChecked) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_PORT}/update/${id}`,
        {
          done: isChecked,
        }
      );
      const updatedTodos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, done: isChecked };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  //deleting the todo with it's id
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_PORT}/delete/${id}`
      );
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      {/* used module css that is why it has module extention */}
      <div id={styles.body}>
        <div>
          <h1 className={styles.h1}>Todo List</h1>
          <input
            type="text"
            placeholder="Ex - 'Feed the cats'"
            value={task}
            id={styles.inputfield}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAdd} className="btn btn-outline-primary">
            Add
          </button>
          <br />
          {/* this block of code is called ternory operation if the length of the todos is 0 it renders the code in the first parenthesis and if the length of todos is not 0 it renders the second parenthesis */}
          {todos.length === 0 ? (
            <div>
              <h1 className={styles.h1}>No Record</h1>
            </div>
          ) : (
            // this is where the second condition starts from
            todos.map((todo) => (
              // as you can see the card classname is added from bootstrap but theres also id it is because of some custom css that i have applied
              <div className={"card"} id={styles.card} key={todo._id}>
                <div id={styles.task}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={styles.checkbox}
                    checked={todo.done}
                    onChange={(e) => handleEdit(todo._id, e.target.checked)}
                  />
                  {/* if the checkk box has been clicked this code would be executed */}
                  {todo.done ? (
                    <p className={styles.line_through}>{todo.task}</p>
                  ) : (
                    <p id={styles.p}>{todo.task}</p>
                  )}
                  <div>
                    <span>
                      {/* just the delete button we also used fontawsome trash icon inside the bootstrap danger or red button className */}
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="btn btn-outline-danger"
                      >
                        <i
                          className="fas fa-trash-alt"
                          style={{ color: "#ffffff" }}
                        ></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

//exporting the todo function componenet for adding in app.jsx
export default TodoPage;
