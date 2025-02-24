const Project = require("../models/project");
const aqp = require("api-query-params");

module.exports = {
  getAllProject: async (queryString) => {
    try {
      let result = null;
      const { filter, limit, population } = aqp(queryString);

      const page = queryString.page;
      if (limit && page) {
        let offset = (page - 1) * limit;
        delete filter.page;
        result = await Project.find(filter)
          .populate(population)
          .skip(offset)
          .limit(limit)
          .exec();
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
      if (projectData.type === "EMPTY-PROJECT") {
        let result = await Project.create(projectData);
        return result;
      }
      if (projectData.type === "ADD-USERS") {
        let myProject = await Project.findById(projectData.projectId).exec();
        for (let i = 0; i < projectData.usersArr.length; i++) {
          myProject.usersInfor.push(projectData.usersArr[i]);
        }

        let newResult = await myProject.save();
        return newResult;
      }
      if (projectData.type === "REMOVE_USERS") {
        let myProject = await Project.findById(projectData.projectId).exec();
        for (let i = 0; i < projectData.usersArr.length; i++) {
          myProject.usersInfor.pull(projectData.usersArr[i]);
        }
        let newResult = await myProject.save();
        return newResult;
      }
      if (projectData.type === "ADD-TASKS") {
        let myProject = await Project.findById(projectData.projectId).exec();
        for (let i = 0; i < projectData.taskArr.length; i++) {
          myProject.tasks.push(projectData.taskArr[i]);
        }
        let newResult = await myProject.save();
        return newResult;
      }

      return null;
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
          ...projectData,
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
