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
};
