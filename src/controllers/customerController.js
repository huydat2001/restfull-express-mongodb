const { uploadedSingleFile } = require("../services/fileService");
const Joi = require("joi");
const {
  createCustomer,
  createManyCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  deleteManyCustomer,
} = require("../services/customerService");
module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),

      address: Joi.string(),

      phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")),

      email: Joi.string().email(),

      description: Joi.string(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("error :>> ", error);
      return res.status(400).json({
        msg: error,
      });
    } else {
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
    }
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
    let { limit, page } = req.query;

    let customers = await getAllCustomer(limit, page, req.query);
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
  deleteCustomerAPI: async (req, res) => {
    let id = req.body.id;

    let result = await deleteCustomer(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteManyCustomerAPI: async (req, res) => {
    let arr = req.body.arr;
    let result = await deleteManyCustomer(arr);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: result,
      });
    }
  },
};
