//importing components, function and libraries
import axios from "axios";
import { useState } from "react";
import styles from "../css/Signup.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import OAuth from "../components/OAuth";
function Signup() {
  //defining states to use in send request and update with Signup functions
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  //Signup function with axios
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        email,
        password
      });
      console.log(response.data);

      //if the compiler has reached down this far without error we can navigate the user to login
      history.push("/login");
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <>
      {/* used module css that is why it has module extention with bootstrap*/}

      <div className={"card"} id={styles.card}>
        <div className={"card-body"}>
          <h2>SignUp</h2>
          <hr />
          <form onSubmit={handleSignup}>
            <div>
              <label>Email : </label>
              {/* used input componenet */}
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
              {/* used input componenet */}
              <input
                type={"password"}
                name="password"
                placeholder={"Enter Password :"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* used the  button componenet with bootstrap success class or the green color*/}
            <button className={"btn btn-outline-success"} type="submit">
              SignUp
            </button>

            {/* used the button componenet with bootstrap danger class or red color*/}
            <button className={"btn btn-outline-danger"}>
              <Link to="/login">LogIn</Link>
            </button>

            {/* firebase OAuth component */}
            <OAuth />
          </form>
        </div>
      </div>
    </>
  );
}
//exporting the function componenet to be used in the app.jsx
export default Signup;
