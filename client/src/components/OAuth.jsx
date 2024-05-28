//libraries for using firebase auth
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../FireBase";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

//main component function
function OAuth() {
  const auth = getAuth(app);
  const history = useHistory();
  const location = useLocation();

  //on click function for both sign up or sign in cases
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogleAuth = await signInWithPopup(auth, provider);

      //axios post request and sending the used email back to the server
      const res = await axios.post("http://localhost:3001/google", {
        email: resultsFromGoogleAuth.user.email
      });

      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      if (res.status == 200) {
        //checking the current path and redirecting accordingly
        if (location.pathname === "/signup") {
          history.push("/login");
        } else if (location.pathname === "/login") {
          history.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        type="button"
        className={"btn btn-outline-warning"}
        onClick={handleGoogleClick}
      >
        <i className="fa-brands fa-google" style={{ color: "#F3DB0A" }}></i>
        &nbsp; Continue with Google
      </Button>
    </>
  );
}

export default OAuth;
