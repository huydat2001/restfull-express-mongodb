require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const fileUpload = require("express-fileupload");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const connection = require("./config/database");

const app = express(); // app express
const port = process.env.PORT || 8888; //port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;

// default options
app.use(fileUpload());

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

//khai báo route
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("error connect to server:>> ", error);
  }
})();
