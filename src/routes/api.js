const express = require("express");

const routerAPI = express.Router();

const { getUsersAPI, postUserAPI } = require("../controllers/apiController");
// router.Method('/route', handler)
routerAPI.get("/", (req, res) => {
  res.send("heelo api");
});

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postUserAPI);

module.exports = routerAPI; //export default
