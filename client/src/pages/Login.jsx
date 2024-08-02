//importing components, function and libraries
import axios from "axios";
import { useState } from "react";
import styles from "../css/Login.module.css";
import { Link, useHistory } from "react-router-dom";
import OAuth from "../components/OAuth";

//main function or page componenet
function Login() {
  //defining states to use in send request and update with login functions
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  //login function with axios
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password
      });

      // Handle successful login response here
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);

      //if the compilar has reached this down without error push the user to home
      history.push("/");
    } catch (error) {
      // Handle errors here
      console.log("Login failed:", error);
    }
  };

  //rendering the web, value is something that access the input field [email is like get it and setEmail is like check changes and send to email same with password]
  return (
    <>
      {/* used module css that is why it has module extention */}

      <div className={styles.body}>
        <div className={"card"} id={styles.card}>
          <div className={"card-body"}>
            <h2>LogIn</h2>
            <hr />
            <form onSubmit={handleLogin}>
              <div>
                <label>Email : </label>
                <input
                  type={"email"}
                  name="email"
                  placeholder={"Enter Email :"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Password : </label>
                <input
                  type={"password"}
                  name="password"
                  placeholder={"Enter Password :"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                id={styles.button}
                className={"btn btn-outline-success"}
                type="submit"
              >
                LogIn
              </button>
              <button className={"btn btn-outline-danger"}>
                <Link to="/signup">SignUp</Link>
              </button>

              {/* firebase OAuth component */}
              <OAuth />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

//exporting the function
export default Login;
