const User = require("./userModel");
const jwt = require("jsonwebtoken");

async function generateToken(userId) {
  // this function will be used to generate jsonwebtoken and return token wherever called
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

exports.signup = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword ||
    !req.body.name
  ) {
    // this if statement will check if all data required to signup is sent or not. and end response request cycle accordingly
    return res.status(400).json({
      message: "Email id, password and name is required!",
    });
  }
  try {
    //following code will match both password and confirm password if both matched then new user will be created.
    // no user will be created if password do not match
    if (req.body.password === req.body.confirmPassword) {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({
        message: "Sign up successfully",
      });
    } else {
      res.json({
        message: "password doesnt match",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      // message:"something went wrong",
    });
  }
};
exports.login = async (req, res) => {
  try {
    //following will check if user exists with provided email id and assign same to user const
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      // if no users are found with provided credentials then we'll send vague response. like email or password is incorrect
      return res.json({
        message: "Email or Password is incorrect",
      });
    }
    //following will compared user's email and password with the provided emaiil and password if both match then jwt will be generated and sent.
    if (user.email === req.body.email && user.password === req.body.password) {
      //generateToken will be called with user's id as an input and it will return token which will be send to authenticated user.
      const token = await generateToken(user.id);
      return res.json({
        jwtToken: token,
      });
    }
  } catch (err) {
    res.json({
      message: "something went wrong",
    });
  }
};
