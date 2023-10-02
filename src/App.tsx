import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";
import { v1 } from "uuid";

export type FilterType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: true },
    { id: v1(), title: "Javascript", isDone: true },
  ]);
  console.log(tasks)

  let [filter, setFilter] = useState<FilterType>("all");

  let filterForTask = tasks;
  if (filter === "completed") {
    filterForTask = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    filterForTask = tasks.filter((t) => t.isDone === false);
  }

  const addTask=(value:string)=>{
    let newTask={id:v1(),title:value,isDone:false};
    let newTasks=[...tasks,newTask];
    setTasks(newTasks);   
  }

  const removeTask = (id: string) => {
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
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
