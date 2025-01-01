const express = require("express");
const bodyParser = require("express");
const {
  createNewTask,
  allTasks,
  fetchTaskById,
  updateTask,
  deleteTask,
} = require("./modelsAndFunctions/taskFunctions");
const { signup, login } = require("./modelsAndFunctions/userFunctions");
const app = express();
app.use(bodyParser.json());
app.post("/signup", signup);
app.post("/login", login);

// Endpoints as listed in pdf //starts
app.route("/tasks").post(createNewTask).get(allTasks);

app.route("/tasks/:id").get(fetchTaskById).put(updateTask).delete(deleteTask);
// Endpoints as listed in pdf //ends

// invalid Router handler//
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl}`,
  });
});

module.exports = app;
