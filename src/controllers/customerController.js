const { uploadedSingleFile } = require("../services/fileService");
const {
  createCustomer,
  createManyCustomer,
  getAllCustomer,
  updateCustomer,
} = require("../services/customerService");
module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;
    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let fileImage = await uploadedSingleFile(req.files.image);
      imageUrl = fileImage.path;
    }
    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };
    let customer = await createCustomer(customerData);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  postCreateArrayCustomer: async (req, res) => {
    let arr = req.body.customers;
    let customer = await createManyCustomer(arr);
    if (customer) {
      return res.status(200).json({
        EC: 0,
        data: customer,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customer,
      });
    }
  },
  getAllCustomerAPI: async (req, res) => {
    let customers = await getAllCustomer();
    return res.status(200).json({
      EC: 0,
      data: customers,
    });
  },
  putUpdateCustomerAPI: async (req, res) => {
    let { id, name, address, phone, email, description } = req.body;
    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let fileImage = await uploadedSingleFile(req.files.image);
      imageUrl = fileImage.path;
    }
    let customerData = {
      id,
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };
    let result = await updateCustomer(customerData);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
