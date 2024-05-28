//importing json web token to create the function
const jwt = require("jsonwebtoken");

//token function that sends a token as a res to the client
const token = (foundUser, res) => {
  const token = jwt.sign(
    { id: foundUser._id, email: foundUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return res.status(200).json({ msg: "user logged in", token });
};

//exporting the created token function
module.exports = token;
