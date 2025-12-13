import model from "./model.js";

export default function ModulesDao() {
  const findModulesForCourse = (courseId) =>
    model.find({ course: courseId });

  const createModule = (courseId, module) =>
    model.create({ ...module, course: courseId });

  const deleteModule = (courseId, moduleId) =>
    model.deleteOne({ _id: moduleId, course: courseId });

  const updateModule = (courseId, moduleId, updates) =>
    model.updateOne(
      { _id: moduleId, course: courseId },
      { $set: updates }
    );

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
