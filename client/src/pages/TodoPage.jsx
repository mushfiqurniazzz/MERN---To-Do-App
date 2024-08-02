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
  //fetching the todos from the server with axios
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos(); // Fetch todos when component mounts
  }, []); // Empty dependency array to run once on mount
  //function for creating e todo with axios
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3001/add", { task });
      setTask(""); // Clear input field after adding task
    } catch (error) {
      console.error("Error adding todo:", error);
    }
    location.reload(); //to create a todo i am reloading the page but not for delete or edit
  };
  // function for marking the state of the todo true/false depending on it's id
  const handleEdit = async (id, isChecked) => {
    try {
      await axios.put(`http://localhost:3001/update/${id}`, {
        done: isChecked
      });
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
      await axios.delete(`http://localhost:3001/delete/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      {/* used module css that is why it has module extention */}
      <div className={styles.home}>
        <h2 className={styles.h2}>Todo List</h2>
        <input
          type="text"
          placeholder="Ex - 'Feed the cats'"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd} className="btn btn-outline-primary">
          Add
        </button>
        <br />
        {/* this block of code is called ternory operation if the length of the todos is 0 it renders the code in the first parenthesis and if the length of todos is not 0 it renders the second parenthesis */}
        {todos.length === 0 ? (
          <div>
            <h2 className={styles.h2}>No Record</h2>
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
    </>
  );
}

//exporting the todo function componenet for adding in app.jsx
export default TodoPage;
