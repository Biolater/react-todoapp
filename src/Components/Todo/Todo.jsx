import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoListItem from "../TodoListItem/TodoListItem";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      e.preventDefault();
      addTask();
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    addTask();
    setNewTask("");
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    } else {
      alert("Please enter a task");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newText;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <h2 className="todo-title">Get Things Done!</h2>
        <form className="todo__input-section">
          <input
            type="text"
            className="todo__input"
            placeholder="What is the task today?"
            value={newTask}
            onChange={(e) => handleInput(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button className="add-task" onClick={(e) => handleButtonClick(e)}>
            Add Task
          </button>
        </form>
        <div className="todolist-items">
          {tasks.map((task, index) => (
            <TodoListItem
              key={index}
              text={task}
              onDelete={() => deleteTask(index)}
              onEdit={(newText) => editTask(index, newText)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
