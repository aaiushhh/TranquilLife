const productivityService = require('./productivityService');

// Controller function to add a todo list
var addTodoListControllerFn = async (req, res) => {
    try {
        var status = await productivityService.addTaskDBService(req.body);
        if (status) {
            res.send({ status: true, message: "Task Added Successfully" });
        } else {
            res.send({ status: false, message: "Error logging user" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error logging user" });
    }
};
var fetchTasksByUsernameControllerFn = async (req, res) => {
    try {
        const { username } = req.params;
        const tasks = await productivityService.getTasksByUsername(username);
        res.send({ status: true, data: tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error fetching tasks" });
    }
};
module.exports={addTodoListControllerFn,fetchTasksByUsernameControllerFn}

// Add controller functions for other operations (like updating task, deleting task, etc.)
