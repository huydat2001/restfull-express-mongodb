const User = require("../models/user");
const {
  uploadedSingleFile,
  uploadedMultipleFiles,
} = require("../services/fileService");
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
const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;
  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const deleteUserAPI = async (req, res) => {
  let userId = req.body.userId;
  let user = await User.deleteOne({ _id: userId }).exec();
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const postUploadSingleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let result = await uploadedSingleFile(req.files.image);
  console.log("result :>> ", result);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};
const postUploadMultipleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (Array.isArray(req.files.image)) {
    let result = await uploadedMultipleFiles(req.files.image);
    console.log("result :>> ", result);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    return await postUploadSingleFileAPI(req, res);
  }
};
module.exports = {
  getUsersAPI,
  postUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultipleFileAPI,
};
