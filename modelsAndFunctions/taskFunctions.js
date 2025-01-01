const Task = require("./taskModel");

// function to generate token

exports.createNewTask = async (req, res) => {
  try {
    //check if title and descriptions are supplied in request
    if (!req.body.title || !req.body.description) {
      // return will end the request right here if required data is not supplied
      return res.status(400).json({
        message: "title and description are required to create task ",
      });
    }
    //create new Task in todolist if all the required data is replied
    const createNewTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
    });
    // send newly created task with request.
    res.status(200).json({
      task: createNewTask,
    });
  } catch (err) {
    //catch errors here if anything goes wrong while creating new task in todolist
    res.json({
      message: "something went wrong",
    });
  }
};

exports.allTasks = async (req, res) => {
  // below will find all documents in task collection and send them in response.
  const allDocuments = await Task.find();
  res.json({
    allTask: allDocuments,
  });
};

exports.fetchTaskById = async (req, res) => {
  try {
    // the following const will check if any task exist with provided id. if exists will be assignment to const task
    const task = await Task.findById(req.params.id);
    // The following if statement checks whether any tasks are assigned to the 'task' constant. If no tasks are assigned, it will set the value to null.
    if (!task)
      return res.status(404).json({
        message: "No task with this id",
      });
    // if any tasks are found with supplied data then they will be sent in response below.
    // above and below if statements use truthy and falsy values..
    if (task) {
      res.json({
        task: task,
      });
    }
  } catch (err) {
    // this catch will send response incase any error occurs while searching for task with provided id
    res.json({
      message: "something went wrong",
    });
  }
};

exports.updateTask = async (req, res) => {
  //following if statement will check if data required to update task is provided or not and send response or end request response cycle according
  if (!req.params.id && !req.body.markStatusAs) {
    return res.status(400).json({
      message: "markStatusAs and id are required to update task ",
    });
  }
  // following if statement will check if status provided to be updated is in-progress or completed
  // no one will be able set status as other than in-progress or completed if someone supplies different data response request cycle will end here.
  if (
    !req.markStatusAs === "in-progress" ||
    !req.markStatusAs === "completed"
  ) {
    return res.status(400).json({
      message: "task can be updated as only in-progress or completed",
    });
  }

  // following try catch statement will run only if above both conditions match.
  try {
    const markStatusAs = req.body.markStatusAs;
    const taskId = req.params.id;
    // following checkIfTaskExist will check if the task with provided id exist or not.
    const checkIfTaskExist = await Task.findById({ _id: taskId });

    if (!checkIfTaskExist) {
      //this statement will execute if No task exist with provided id
      return res.status(400).json({
        message: "no task with this id",
      });
    }
    if (checkIfTaskExist) {
      //it will run if task exist with provided id
      //following updateTask const will find the task with provided id and update the status of it accordingly example in-progress or completed
      const updateTask = await Task.findByIdAndUpdate(
        { _id: taskId },
        {
          status: markStatusAs,
        }
      );
      res.json({
        updatedTask: updateTask,
      });
    }
  } catch (err) {
    res.json({
      message: "invalid id or something went wrong!",
    });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  // follwing will check if task exists with provided id
  const checkIfTaskExist = await Task.findById({ _id: taskId });
  // following if statement runs if no tasks exists with provided id and it will end the response request cycle right here.
  if (!checkIfTaskExist) {
    return res.status(400).json({
      message: "No task found with this id",
    });
  }
  try {
    const taskId = req.params.id;
    //following will look for task with provided id and update it.
    const deleteTask = await Task.findByIdAndDelete({ _id: taskId });
    res.json({
      message: "task deleted successfully",
    });
  } catch (err) {
    // following response will be sent if anything wrong goes while deleting task.
    res.json({
      message: "invalid id or something went wrong!",
    });
  }
};
