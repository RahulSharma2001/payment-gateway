const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login

const login = async (req, res) => {
  console.log(req.body.userId);
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.json({
      success: false,
      message: "Enter valid username or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      success: false,
      message: "Enter valid username or password",
    });
  }

  const token = getToken(user._id);
  res.json({
    success: true,
    message: "Sign In Successfully",
    token,
  });
};

//signup
const signup = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return res.json({
        success: false,
        message: "User exist already",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new userModel({
      name,
      username,
      password: hashPassword,
    });

    const userData = await newUser.save();

    const token = getToken(userData._id);
    return res.json({
      success: true,
      message: "Sign Up Successfully",
      id: userData._id,
      token,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: `Error Occured ${e}`,
    });
  }
};

const userController = {
  login,
  signup,
};

module.exports = userController;
