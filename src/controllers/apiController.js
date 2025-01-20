const User = require("../models/user");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};
const postUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};
const updateUserAPI = async (req, res) => {
  let userId = req.body.userId;
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};
module.exports = {
  getUsersAPI,
  postUserAPI,
  updateUserAPI,
};
