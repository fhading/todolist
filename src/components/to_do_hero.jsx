import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; //  import ng  uuid para maka generate ng task mag cry n lang tlgaaaa
import "./style/TodoApp.css"; 

const ToDoApp = () => {
  // store ng mga list ng task/ array
  const [tasks, setTasks] = useState([]);
  // store yung sa import ng value
  const [taskInput, setTaskInput] = useState("");
  //  store yung  para mag select ng category sa task
  const [selectedCategory, setSelectedCategory] = useState("personal");
  // ito store ng id pag mag edit ng task
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    // para di empty tasks
    if (taskInput.trim() === "") return;
    
    // mag add task sa list huhu
    setTasks([
      ...tasks,
      { id: uuidv4(), text: taskInput, completed: false, category: selectedCategory },
    ]);
    // Clear the input pag na add na
    setTaskInput("");
  };

  // delete ng task tapos identify and id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // parang mag check if complete na ba
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // para mag edit na ng task hayss
  const startEditing = (id, text) => {
    setEditingId(id); 
    setEditText(text); 
  };

  // save ng edit task huhu
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: editText } : task))
    );
    setEditingId(null); // clear edit pag tapos na
  };

  return (
    
      <main className="todo-content">
        <h1 className="main-focus"> To Do List</h1>
        <h2 className="focus-task">MY TASKS</h2>

        
        <div className="task-input-section">
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="personal">🔴 Personal</option>
            <option value="freelance">🔵 Freelance</option>
            <option value="work">🟡 Work</option>
          </select>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="What is your next task?"
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* Active Task t */}
        <ul className="task-list">
          {tasks.filter(task => !task.completed).map((task) => (
            <li key={task.id} className={`task-item ${task.category}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
              )}
              {editingId === task.id ? (
                <button onClick={() => saveEdit(task.id)}>save</button>
              ) : (
                <button onClick={() => startEditing(task.id, task.text)}>✏️</button>
              )}
              <button onClick={() => deleteTask(task.id)} className="delete-btn">delete</button>
            </li>
          ))}
        </ul>

        {/* Done Task List */}
        <h2 className="focus-task">DONE TASKS</h2>
        <ul className="task-list">
          {tasks.filter(task => task.completed).map((task) => (
            <li key={task.id} className="task-item completed">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className="completed">{task.text}</span>
              <button onClick={() => deleteTask(task.id)} className="delete-btn">delete</button>
            </li>
          ))}
        </ul>
      </main>
   
  );
};

export default ToDoApp;
