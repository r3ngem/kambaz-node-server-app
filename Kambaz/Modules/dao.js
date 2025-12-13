import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function ModulesDao() {

  const findModulesForCourse = async (courseId) => {
    return await model.find({ course: courseId });
  };

  const createModule = async (courseId, module) => {
    return await model.create({ _id: uuidv4(), ...module, course: courseId });
  };

  const deleteModule = async (moduleId) => {
    return await model.deleteOne({ _id: moduleId });
  };

  const updateModule = async (moduleId, updates) => {
    return await model.updateOne({ _id: moduleId }, updates);
  };

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule
  };
}