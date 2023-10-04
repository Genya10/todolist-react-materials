import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";
import { v1 } from "uuid";

export type FilterType = "all" | "active" | "completed";

type TodolistType={
  id:string,
  title:string,
  filter:FilterType,
}

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: true },
    { id: v1(), title: "Javascript", isDone: true },
  ]);
  let [movies, setMovies] = useState<Array<TaskType>>([
    { id: v1(), title: "Crossfit", isDone: false },
    { id: v1(), title: "Terminatir", isDone: false },
    { id: v1(), title: "Go-go", isDone: true },
  ]);
  let [books, setBooks] = useState<Array<TaskType>>([
    { id: v1(), title: "Crossfit", isDone: false },
    { id: v1(), title: "Terminatir", isDone: true},
    { id: v1(), title: "Go-go", isDone: true },
  ]);


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
  const checkTask=(taskId:string,isDone:boolean)=>{
   let task = tasks.find((t)=> t.id === taskId);
   if(task){
    task.isDone = isDone;
   }
   setTasks([...tasks]);
  }  
  const changeFilter = (value: FilterType,todoId:string) => {
    let todolist= todoLists.find((tl)=>tl.id === todoId)
    if(todolist){
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  let [todoLists,setTodoLists] = useState <Array<TodolistType>>([
    {id:v1(),title:"Frontend",filter:"all",},
    {id:v1(),title:"Movies",filter:"active",},
    {id:v1(),title:"Books",filter:"completed",},
   ]);
  return (
    <div className="App">
      {todoLists.map((tl) => {
       
      let filterForTask = tasks;
      if (tl.filter === "completed") {
        filterForTask = tasks.filter((t) => t.isDone === true);
      }
      if (tl.filter === "active") {
        filterForTask = tasks.filter((t) => t.isDone === false);
      }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={filterForTask}
            addTask={addTask}          
            removeTask={removeTask}
            changeFilter={changeFilter}
            checkTask={checkTask}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
