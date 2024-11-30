const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bodyParser.json());

let tasks = [];

// Create a new task
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    const newTask = { id: uuidv4(), title, status: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// List all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const task = tasks.find((t) => t.id === id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (status !== undefined) task.status = status;
    res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== id);
    res.status(204).send();
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
