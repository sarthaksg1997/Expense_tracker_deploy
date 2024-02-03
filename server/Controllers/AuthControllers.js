const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "sinchan super secret key", {
    expiresIn: maxAge,
  });
};

function capitalizeFirstLetter(inputString) {
  return (
    inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
  );
}

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Email is required") {
    errors.email = err.message;
  }

  if (err.message === "Password is required") {
    errors.password = err.message;
  }

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "Invalid email address format") {
    errors.email = "Invalid email address";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      if (properties.path === "password") {
        errors[properties.path] = capitalizeFirstLetter(
          `${properties.path} is ${properties.type}`
        );
      } else {
        errors[properties.path] = properties.message;
      }
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};
