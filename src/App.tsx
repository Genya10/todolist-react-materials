import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { AddTaskInput } from "./AddTaskInput";
import { v1 } from "uuid";
import { TaskType } from "./Todolist";
import { AppBar,Toolbar,IconButton,Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";

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
  const changeSpanTitle=(taskId:string,newValue:string,todoId:string)=>{
        let tasksArray=tasks[todoId];
        let task = tasksArray.find((t)=>t.id === taskId);
     if(task){
       task.title= newValue;
  }
  setTasks({...tasks});
  }
  const changeMainTitle=(newValue:string,todoId:string)=>{
     let todolist = todoLists.find((tl)=>tl.id === todoId);
     if(todolist){
      todolist.title=newValue;
     }     
     setTodoLists([...todoLists]);
  }
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 6 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            Todolists
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <Paper elevation={3} style={{margin:'15px',padding:'10px'}}>
            <AddTaskInput addItem={addTodolist} />
          </Paper>
        </Grid>
        <Grid container spacing={5}>
          {todoLists.map((tl) => {
            let filterForTask = tasks[tl.id];
            if (tl.filter === "completed") {
              filterForTask = filterForTask.filter((t) => t.isDone === true);
            }
            if (tl.filter === "active") {
              filterForTask = filterForTask.filter((t) => t.isDone === false);
            }

            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
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
                    changeSpanTitle={changeSpanTitle}
                    changeMainTitle={changeMainTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
