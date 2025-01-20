const express = require("express");

const routerAPI = express.Router();

const {
  getUsersAPI,
  postUserAPI,
  updateUserAPI,
} = require("../controllers/apiController");
// router.Method('/route', handler)
routerAPI.get("/", (req, res) => {
  res.send("heelo api");
});

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postUserAPI);
routerAPI.put("/users", updateUserAPI);

module.exports = routerAPI; //export default
