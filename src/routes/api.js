const express = require("express");

const routerAPI = express.Router();

const {
  getUsersAPI,
  postUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultipleFileAPI,
} = require("../controllers/apiController");
// router.Method('/route', handler)
routerAPI.get("/", (req, res) => {
  res.send("heelo api");
});

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);
routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postUploadMultipleFileAPI);

module.exports = routerAPI; //export default
