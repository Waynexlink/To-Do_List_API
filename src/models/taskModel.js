const mongoose = require("mongoose");

const taskModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "a task should have a title "],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

const Task = mongoose.model("Task", taskModel);
module.exports = Task;
