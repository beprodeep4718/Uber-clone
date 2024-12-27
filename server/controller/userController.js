const { validationResult } = require("express-validator");
const userModel = require("../models/userSchema");
const userServices = require("../services/user.service");
const blackList = require("../models/blacklist.model");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const hashPassword = await userModel.hashPassword(password);
  const user = await userServices.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userServices.findUser({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackList.create({ token });
  res.status(200).json({ message: "Logged out successfully" });
}
