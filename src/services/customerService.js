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
  getAllCustomer: async () => {
    try {
      let result = await Customer.find({});
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
};
