const mongoose = require("mongoose");
const mongoose_delete = require(mongoose_delete);
const customerSchema = new mongoose.Schema({
  email: String,
  address: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: Date,
    endDate: Date,
    description: String,
    customerInfor: customerSchema,
    usersInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    leader: userSchema,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);
projectSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
