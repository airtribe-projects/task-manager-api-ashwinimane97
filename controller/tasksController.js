const fs = require('fs');

let data = fs.readFileSync("task.json", 'utf-8');
let taskData = JSON.parse(data);

const getAllTasks = (req, res) => {

    let { completed, sortBy, order } = req.query;
    let taskAsPerFilter = [];


    // Read JSON data with error handling
    let taskData = {};
    try {
        let data = fs.readFileSync("task.json", 'utf-8');
        taskData = JSON.parse(data);
    } catch (error) {
        console.error("Error reading task.json:", error.message);
        return res.status(400).json({ "message": "Error reading task.json:", error: error.message })
    }
     

    if(sortBy != undefined) {
        taskData.tasks.sort((a,b) => {
            let dateA = new Date(a.dateTime)
            let dateB = new Date(b.dateTime);
            return order === "asc" ? dateA - dateB : dateB - dateA
        })
    }

    if (completed != undefined) {
        const isCompleted = completed === "true";
        taskAsPerFilter = taskData.tasks.filter((singleTask) => singleTask.completed == isCompleted);
    } else {
        taskAsPerFilter = taskData.tasks;
    }

    res.status(200).json(taskAsPerFilter)
}

const getTaskById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    const task = taskData.tasks.find((t) => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
};

const getTaskByPriority = (req, res) => {

    let priorityLevel = req.params.level;

    if (!priorityLevel) {
        return res.status(400).json({ "message": `Task no found` })
    }

    let alltaskWithReqPriority = taskData.tasks.filter((singleTask) => {
        if (singleTask.priority == priorityLevel) {
            return true
        }
    })

    res.status(200).json({ "message": `successfully retrived tasddk by Priority: ${priorityLevel}`, data: alltaskWithReqPriority })
}

const createTask = (req, res) => {

    let { title, description, completed, priority } = req.body;

    if (title == undefined || title.length <= 0) {
        return res.status(400).json({ "message": `Title is required and cannot be empty` })
    } else if (description == undefined || description.length <= 0) {
        return res.status(400).json({ "message": `Description is required and cannot be empty` })
    } else if (typeof completed != "boolean") {
        return res.status(400).json({ "message": `Completed should be type of boolean` })
    }

    let id = taskData.tasks.length + 1

    taskData.tasks.push({ id: id, title, description, completed, priority, dateTime: new Date().toISOString() });

    // write this taskdata in the file.
    fs.writeFile("task.json", JSON.stringify(taskData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing to file" });
        }
    })

    res.status(201).json({ "message": `successfully added new task with id : ${id}` })
}

const updateTask = (req, res) => {

    const id = parseInt(req.params.id, 10);

    const taskIndex = taskData.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Validate "completed" field
    if ("completed" in req.body && typeof req.body.completed !== "boolean") {
        return res.status(400).json({ message: "Invalid data: 'completed' must be a boolean" });
    }

    // Update task
    taskData.tasks[taskIndex] = { ...taskData.tasks[taskIndex], ...req.body };

    return res.status(200).json(taskData.tasks[taskIndex]);

    // write this taskdata in the file.
    fs.writeFile("task.json", JSON.stringify(taskData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing to file" });
        } else {
            return res.status(200).json({ "message": `successfully updated task with id : ${id}` })
        }
    })
}

const deleteTask = (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(404).json({ "message": `Task no found` })
    }

    let idxTask = taskData.tasks.findIndex((task) => task.id == id);

    if (idxTask != -1) {
        taskData.tasks.splice(idxTask, 1);
        res.status(200).json({ "message": "Task deleted successfully" });
    } else {
        res.status(404).json({ "message": "Task not found" });
    }

}

module.exports = {
    getAllTasks,
    getTaskById,
    getTaskByPriority,
    createTask,
    updateTask,
    deleteTask
}