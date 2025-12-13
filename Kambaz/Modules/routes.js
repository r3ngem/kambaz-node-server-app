import ModulesDao from "../Modules/dao.js";
export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  }

  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body
    };
    const newModule = await dao.createModule(courseId, module);
    res.send(newModule);
  }

const updateModule = async (req, res) => {
  const { moduleId } = req.params;
  const moduleUpdates = req.body;
  const status = await dao.updateModule(moduleId, moduleUpdates);
  res.json(status);
};

const deleteModule = async (req, res) => {
  const { moduleId } = req.params;
  const status = await dao.deleteModule(moduleId);
  res.json(status);
};


  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
}