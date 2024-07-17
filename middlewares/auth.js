const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "User not Authorized",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = user.id;
    next();
  } catch (e) {
    return res.json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = auth;
