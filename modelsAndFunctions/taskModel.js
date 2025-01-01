const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Task must have an title"],
  },
  description: {
    type: String,
    required: [true, "A Task must have an description"],
  },
  status: {
    type: String,
    default: "pending",
    required: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

// const taskSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: [true,'A User must have an id'],
//         select: false,
//     },
//     title: {
//         type: String,
//         required: [true,'A Task must have an title']
//     },
//
//     description: {
//         type: String,
//         required: [true,'A Task must have an description']
//     },
//     status: {
//         type: String,
//         default: 'pending',
//         required: false,
//     },
// })
