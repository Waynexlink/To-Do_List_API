const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id,
    });

    res
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    let query = Task.find({ user: req.user._id });

    if (req.query.status) {
      query = query.find({ status: req.query.status });
    }

    const task = await query;

    if (task.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No tasks found", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "Task successfully recieved",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found or unauthorized",
      });
    }
    Object.assign(task, req.body, { new: true, runValidators: true });
    await task.save();

    res
      .status(200)
      .json({ success: true, message: "task successfully updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found or unauthorized",
        error: error.message,
      });
    }

    await task.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "task successfully deleted  " });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
