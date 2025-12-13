import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  course: { type: String, required: true },
  lessons: [
    {
      _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
      name: { type: String, required: true },
      description: { type: String, default: "" }
    }
  ]
}, { collection: "modules" }
);

export default moduleSchema;