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
const {
  postCreateCustomer,
  postCreateArrayCustomer,
  getAllCustomerAPI,
  putUpdateCustomerAPI,
  deleteCustomerAPI,
  deleteManyCustomerAPI,
} = require("../controllers/customerController");

const {
  getProjectsAPI,
  postCreateProjectsAPI,
  putUpdateProjectAPI,
  deleteProjectAPI,
  postCreateManyProjectsAPI,
  deleteManyProjectAPI,
} = require("../controllers/projectController");

const {
  postCreateTask,
  updateTask,
  deleteTask,
  getAllTask,
} = require("../controllers/taskController");

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

routerAPI.post("/customers", postCreateCustomer);
routerAPI.post("/customers-many", postCreateArrayCustomer);
routerAPI.get("/customers", getAllCustomerAPI);
routerAPI.put("/customers", putUpdateCustomerAPI);
routerAPI.delete("/customers", deleteCustomerAPI);
routerAPI.delete("/customers-many", deleteManyCustomerAPI);

routerAPI.get("/projects", getProjectsAPI);
routerAPI.post("/projects", postCreateProjectsAPI);
routerAPI.post("/projects-many", postCreateManyProjectsAPI);
routerAPI.put("/projects", putUpdateProjectAPI);
routerAPI.delete("/projects", deleteProjectAPI);
routerAPI.delete("/projects-many", deleteManyProjectAPI);

routerAPI.get("/tasks", getAllTask);
routerAPI.post("/tasks", postCreateTask);
routerAPI.put("/tasks", updateTask);
routerAPI.delete("/tasks", deleteTask);
routerAPI.get("/info", (req, res) => {
  return res.status(200).json({
    data: req.query,
  });
});
routerAPI.get("/info/:name/:address", (req, res) => {
  return res.status(200).json({
    data: req.params,
  });
});

module.exports = routerAPI; //export default
