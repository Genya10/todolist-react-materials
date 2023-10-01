import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";

export type FilterType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "React", isDone: true },
    { id: 2, title: "Redux", isDone: false },
    { id: 3, title: "Typescript", isDone: true },
    { id: 4, title: "Javascript", isDone: true },
  ]);

  let [filter, setFilter] = useState<FilterType>("all");

  let filterForTask = tasks;
  if (filter === "completed") {
    filterForTask = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    filterForTask = tasks.filter((t) => t.isDone === false);
  }

  const removeTask = (id: number) => {
    tasks = tasks.filter((t) => t.id !== id);
    setTasks(tasks);
    console.log(tasks);
  };

  const changeFilter = (value: FilterType) => {
    setFilter(value);
  };

  return (
    <div className="App">
      <Todolist
        title="English"
        tasks={filterForTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
