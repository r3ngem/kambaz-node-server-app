import ModuleModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function ModulesDao() {
  return {
    createModule: async (courseId, module) => {
      const newModule = {
        _id: uuidv4(),
        ...module,
        course: courseId,
        lessons: module.lessons || []
      };
      return await ModuleModel.create(newModule);
    },

    findModulesForCourse: async (courseId) => {
      return await ModuleModel.find({ course: courseId });
    },

    updateModule: async (moduleId, updates) => {
      return await ModuleModel.findByIdAndUpdate(moduleId, updates, { new: true });
    },

    deleteModule: async (moduleId) => {
      return await ModuleModel.findByIdAndDelete(moduleId);
    }
  };
}