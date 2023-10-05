import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { AddTaskInput } from "./AddTaskInput";
import { v1 } from "uuid";
import { TaskType } from "./Todolist";

export type FilterType = "all" | "active" | "completed";

type TodolistType={
  id:string,
  title:string,
  filter:FilterType,
}
type TypeTasks={
 [key:string]:Array<TaskType>
}

function App() {

  const addTask=(value:string,todoId:string)=>{
    let newTask={id:v1(),title:value,isDone:false};
    let tasksArray= tasks[todoId];
    let newTasks=[...tasksArray,newTask];
    tasks[todoId]=newTasks;
    setTasks({...tasks});   
  }
  const removeTask = (id: string,todoId:string) => {
    let tasksArray=tasks[todoId];
    let filteredTasksArray = tasksArray.filter((t) => t.id !== id);
    tasks[todoId] = filteredTasksArray;
    setTasks({...tasks});
    console.log(tasks);
  };
  const checkTask=(taskId:string,isDone:boolean,todoId:string)=>{
    let tasksArray=tasks[todoId];
    let task = tasksArray.find((t)=> t.id === taskId);
   
   if(task){
    task.isDone = isDone;
   }
   setTasks({...tasks});
  }  
  const changeFilter = (value: FilterType,todoId:string) => {
    let todolist= todoLists.find((tl)=>tl.id === todoId)
    if(todolist){
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const todolist1=v1();
  const todolist2=v1();
  const todolist3=v1();

  let [todoLists,setTodoLists] = useState <Array<TodolistType>>([
    {id:todolist1,title:"Frontend",filter:"all",},
    {id:todolist2,title:"Movies",filter:"all",},
    {id:todolist3,title:"Books",filter:"all",},
   ]);

  let [tasks,setTasks] = useState<TypeTasks>({
    [todolist1]:[
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Typescript", isDone: true },
      { id: v1(), title: "Javascript", isDone: true },
    ],
    [todolist2]:[
      { id: v1(), title: "Crossfit", isDone: false },
      { id: v1(), title: "Terminatir", isDone: false },
      { id: v1(), title: "Go-go", isDone: true },
    ],
    [todolist3]:[
      { id: v1(), title: "The ring", isDone: false },
      { id: v1(), title: "Angels", isDone: true},
      { id: v1(), title: "Focus", isDone: true },
    ]
  })
  const removeTodolist=(todoId:string)=>{
    let todolistFilter=todoLists.filter((tl)=> {
     return tl.id !== todoId })     
      setTodoLists(todolistFilter);
      delete tasks[todoId];
      setTasks({...tasks}); 
  }
  const addTodolist=(value:string)=>{
    let newTodoList:TodolistType={id:v1(),title:value,filter:'all'};
    setTodoLists([newTodoList,...todoLists]);
    setTasks({
      ...tasks,
      [newTodoList.id]:[]})     
  }

  return (
    <div className="App">

  <AddTaskInput 
    addItem={addTodolist}/>

      {todoLists.map((tl) => {
       
      let filterForTask = tasks[tl.id];
      if (tl.filter === "completed") {
        filterForTask = filterForTask.filter((t) => t.isDone === true);
      }
      if (tl.filter === "active") {
        filterForTask = filterForTask.filter((t) => t.isDone === false);
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
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
