const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY =
  "259b65e6c66fa07efffe8efce355210280b48aca3a9dbf45250f4171c43ff41e32ae59a37c167e9e73f58d5a36c68ca3a48105105a0a6ce21fc28ce014af8725";

const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName: userName }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, userName: user.userName },
      SECRET_KEY
    );
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).send("Cleared cookie and logged out");
  } catch {
    res.status(401).send("something went wrong while deleting");
  }
};

const verifyLogin = (req, res) => {
  try {
    if (req.cookies && req.cookies.token) {
      const token = req.cookies.token;
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          // If token verification fails
          res.status(401).json({ isLoggedIn: false, error: "Invalid token" });
        } else {
          // If token verification succeeds
          res.json({ isLoggedIn: true, user: decoded });
        }
      });
    } else {
      res.status(401).json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error("Error verifying login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  verifyLogin,
  logout,
};
