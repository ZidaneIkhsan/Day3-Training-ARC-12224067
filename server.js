require("dotenv").config();
console.log("API Key:", process.env.WEATHER_API_KEY);
const axios = require("axios");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, task: "Belajar Node.js", done: false },
    { id: 2, task: "Integrasi API Publik", done: false }
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task tidak boleh kosong" });

    const newTask = { id: tasks.length + 1, task, done: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) return res.status(404).json({ message: "Tugas tidak ditemukan" });

    task.done = !task.done;
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: "Tugas dihapus" });
});

app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data cuaca" });
    }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
