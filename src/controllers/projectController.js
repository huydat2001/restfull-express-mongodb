const {
  getAllProject,
  postCreateProjects,
  updateProject,
  deleteProject,
  postCreateManyProjects,
  deleteManyProject,
} = require("../services/projectService");
module.exports = {
  getProjectsAPI: async (req, res) => {
    try {
      let project = await getAllProject(req.query);
      return res.status(200).json({
        EC: 0,
        data: project,
      });
    } catch (error) {
      return res.status(200).json({
        er: error,
      });
    }
  },
  postCreateProjectsAPI: async (req, res) => {
    const {
      type,
      name,
      startDate,
      endDate,
      description,
      customerInfor: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      } = {},
      leader: { name: leaderName, email: leaderEmail } = {},
    } = req.body;
    const customerInfor = {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
    };

    const leader = {
      name: leaderName,
      email: leaderEmail,
    };
    const projectData = {
      type,
      name,
      startDate,
      endDate,
      description,
      customerInfor,
      leader,
    };

    try {
      let project = await postCreateProjects(req.body);
      return res.status(200).json({
        EC: 0,
        data: project,
      });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).json({
        data: error,
      });
    }
  },
  postCreateManyProjectsAPI: async (req, res) => {
    let projects = await postCreateManyProjects(req.body);
    if (projects) {
      return res.status(200).json({
        EC: 0,
        data: projects,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: projects,
      });
    }
  },
  putUpdateProjectAPI: async (req, res) => {
    const {
      id,
      name,
      startDate,
      endDate,
      description,
      customerInfor: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      } = {},
      leader: { name: leaderName, email: leaderEmail } = {},
    } = req.body;
    const customerInfor = {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
    };

    const leader = {
      name: leaderName,
      email: leaderEmail,
    };

    const projectData = {
      id: id,
      name,
      startDate,
      endDate,
      description,
      customerInfor,
      leader,
    };
    try {
      let project = await updateProject(projectData);
      return res.status(200).json({
        EC: 0,
        data: project,
      });
    } catch (error) {
      console.log("errors :>> ", error);
      return res.status(500).json({
        data: error,
      });
    }
  },
  deleteProjectAPI: async (req, res) => {
    try {
      const id = req.body.id;
      let project = await deleteProject(id);
      return res.status(200).json({
        EC: 0,
        data: project,
      });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(200).json({
        EC: 0,
        data: error,
      });
    }
  },
  deleteManyProjectAPI: async (req, res) => {
    let arr = req.body.Project;
    let projects = await deleteManyProject(arr);
    if (projects) {
      return res.status(200).json({
        EC: 0,
        data: projects,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: projects,
      });
    }
  },
};
