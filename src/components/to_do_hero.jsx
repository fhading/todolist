import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style/TodoApp.css"; // ✅ Correct import for CSS

const categories = [
  { name: "Personal", color: "red" },
  { name: "Work", color: "blue" },
  { name: "Freelance", color: "yellow" },
];

const ToDoHero = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { id: uuidv4(), text: taskInput, category: selectedCategory, completed: false }]);
    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: editText } : task))
    );
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="profile">
          <img src="C:/Users/Acer/todo_proj/src/components/MOANA.png" alt="Profile" />
          <div className="profile-name">Fhadia Maria Veron</div>
        </div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </div>
      <div className="todo-content">
        <h1 className="main-focus">To-Do List</h1>
        <div className="task-input-section">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a new task..."
          />
          <select onChange={(e) => setSelectedCategory(categories[e.target.selectedIndex])}>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <button onClick={addTask}>Add</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item" style={{ borderLeftColor: task.category.color }}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className={task.completed ? "completed" : ""}>{task.text}</span>
              )}
              {editingTask === task.id ? (
                <button onClick={() => saveEdit(task.id)}>Save</button>
              ) : (
                <button onClick={() => startEditing(task)}>Edit</button>
              )}
              <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoHero;
