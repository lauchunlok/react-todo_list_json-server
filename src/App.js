import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };

        getTasks();
    }, []);

    // Fetch all tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();

        return data;
    };

    // Fetch single task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();

        return data;
    };

    // Add task
    const addTask = async (task) => {
        // add to server
        const res = await fetch("http://localhost:5000/tasks/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(task),
        });
        // add to UI
        const data = await res.json();
        setTasks([data, ...tasks]);

        // const newTask = { ...task, id: nanoid() };
        // setTasks([newTask, ...tasks]);
    };

    // Delete task
    const deleteTask = async (id) => {
        // console.log("delete", id);
        await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updTask),
        });

        const data = await res.json();

        // console.log(id);
        setTasks((prevTasks) =>
            prevTasks.map((prevTask) =>
                prevTask.id === id
                    ? { ...prevTask, reminder: data.reminder }
                    : { ...prevTask }
            )
        );
    };

    return (
        <Router>
            <div className="App">
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                {/* if showAddTask, show the AddTask component */}
                                {showAddTask && <AddTask onAdd={addTask} />}
                                {tasks.length > 0 ? (
                                    <Tasks
                                        tasks={tasks}
                                        onDelete={deleteTask}
                                        onToggle={toggleReminder}
                                    />
                                ) : (
                                    <p>No Tasks To Show</p>
                                )}
                            </>
                        }
                    />

                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
