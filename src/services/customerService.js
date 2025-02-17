const { model } = require("mongoose");
const Customer = require("../models/customer");
module.exports = {
  createCustomer: async (customerData) => {
    try {
      let customer = await Customer.create({
        name: customerData.name,
        address: customerData.address,
        phone: customerData.phone,
        email: customerData.email,
        description: customerData.description,
        image: customerData.image,
      });
      return customer;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  createManyCustomer: async (arr) => {
    try {
      let result = Customer.insertMany(arr);
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  findByIDCustomer: async (id) => {
    try {
      let result = await Customer.findById(id).exec();
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  getAllCustomer: async (limit, page, name) => {
    try {
      let result = null;
      if (limit && page) {
        let offset = (page - 1) * limit;
        if (name) {
          result = await Customer.find({
            name: { $regex: ".*" + name + ".*" },
          })
            .skip(offset)
            .limit(limit)
            .exec();
        } else {
          result = await Customer.find({}).skip(offset).limit(limit).exec();
        }
      } else {
        result = await Customer.find({});
      }
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  updateCustomer: async (customerData) => {
    try {
      let findCustomer = await module.exports.findByIDCustomer(customerData.id);

      let result = await Customer.updateOne(
        { _id: findCustomer },
        {
          name: customerData.name,
          address: customerData.address,
          phone: customerData.phone,
          email: customerData.email,
          description: customerData.description,
          image: customerData.image,
        }
      );
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  deleteCustomer: async (id) => {
    try {
      let result = await Customer.deleteById({ _id: id });
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  deleteManyCustomer: async (arr) => {
    try {
      let result = Customer.delete({ _id: { $in: arr } });
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
};
