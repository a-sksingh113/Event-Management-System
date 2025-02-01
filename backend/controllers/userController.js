const User = require("../models/userModel");

const handleUserSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    if (!token) {
      throw new Error("Token generation failed");
    }
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("error signin ", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
};

const handleUserSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exits" });
    }
    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    return res
      .status(201)
      .json({ message: "User created successfuly", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleUserSignup, handleUserSignin };
