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

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    let query = Task.find({ user: req.user._id });

    if (req.query.status) {
      return (query = query.find({ status: req.query.status }));
    }

    const task = await query;

    if (task.length === 0) {
      return res.status(200).json({ message: "No tasks found", tasks: [] });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        message: "task not found or unauthorized",
      });
    }
    Object.assign(task, req.body);
    await task.save();

    res
      .status(200)
      .json({ success: true, message: "task successfully updated" });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "task not found or unauthorized",
        error: error.message,
      });
    }
    res.status(204).json({ success: true, task });
  } catch (error) {
    res.status(404).json({
      message: "fail to delete",
      error: error.message,
    });
  }
};
