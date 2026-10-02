import "./App.css";
import React from "react";
import Overview from "./components/Overview";

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [currentTask, setCurrentTask] = React.useState({});

  //Create unique ID's to use as the key value when mapping elements in Overview component
  const [uniqueID, setUniqueId] = React.useState(1);

  function increment() {
    setUniqueId((prev) => prev + 1);
  }

  function handleClick() {
    setTasks((prev) => [...prev, currentTask]);
    increment();
    setCurrentTask({});
  }

  function handleChange(event) {
    const target = event.target;
    setCurrentTask({ id: uniqueID, text: target.value });
  }

  function deleteTask(event) {
    const target = event.target.parentNode.parentNode;
    setTasks((prev) => prev.filter((curr) => curr.id !== parseInt(target.id)));
  }

  function editTask(event, value) {
    const target = event.target.parentNode.parentNode;
    const index = parseInt(target.id);
    setTasks((prev) => {
      return prev.map((task) =>
        task.id === index ? { ...task, text: value } : task
      );
    });
  }

  return (
    <div className="App">
      <label htmlFor="task">Enter a new task here:</label>
      <input
        type="text"
        name="task"
        id="task"
        placeholder="Task"
        value={currentTask.text || ""}
        onChange={handleChange}
      />
      <button id="submit" onClick={handleClick}>
        Submit
      </button>
      <Overview tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
