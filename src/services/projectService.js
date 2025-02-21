const Project = require("../models/project");
const aqp = require("api-query-params");

module.exports = {
  getAllProject: async (limit, page, queryString) => {
    try {
      let result = null;
      if (limit && page) {
        let offset = (page - 1) * limit;
        const { filter } = aqp(queryString);
        delete filter.page;
        console.log("filter :>> ", filter);
        result = await Project.find(filter).skip(offset).limit(limit).exec();
      } else {
        result = await Project.find({});
      }
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  postCreateProjects: async (projectData) => {
    try {
      if (projectData.type == "EMPTY-PROJECT") {
        let result = await Project.create({
          name: projectData.name,
          startDate: projectData.startDate,
          endDate: projectData.endDate,
          description: projectData.description,
          customerInfor: {
            name: projectData.customerInfor?.name,
            phone: projectData.customerInfor?.phone,
            email: projectData.customerInfor?.email,
          },
          leader: {
            name: projectData.leader?.name,
            email: projectData.leader?.email,
          },
        });
        return result;
      }
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  postCreateManyProjects: async (projects) => {
    try {
      let result = await Project.insertMany(projects.Project);
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  findByIDProject: async (id) => {
    try {
      let result = await Project.findById(id);
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  updateProject: async (projectData) => {
    try {
      let project = await module.exports.findByIDProject(projectData.id);
      let result = await Project.updateOne(
        { _id: project },
        {
          name: projectData.name,
          startDate: projectData.startDate,
          endDate: projectData.endDate,
          description: projectData.description,
          customerInfor: {
            name: projectData.customerInfor?.name,
            phone: projectData.customerInfor?.phone,
            email: projectData.customerInfor?.email,
          },
          leader: {
            name: projectData.leader?.name,
            email: projectData.leader?.email,
          },
        }
      );
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  deleteProject: async (id) => {
    try {
      let result = await Project.deleteById({ _id: id });
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
  deleteManyProject: async (id) => {
    console.log("id :>> ", id);
    try {
      let result = await Project.delete({ _id: { $in: id } });
      return result;
    } catch (error) {
      console.log("error :>> ", error);
      return null;
    }
  },
};
