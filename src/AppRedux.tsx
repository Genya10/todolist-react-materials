import { useState,useReducer } from "react";
import { Todolist } from "./Todolist";
import { AddTaskInput } from "./AddTaskInput";
import { v1 } from "uuid";
import { TaskType } from "./Todolist";
import { AppBar,Toolbar,IconButton,Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import { todolistsReducer } from "./state/todolists-reducer";
import { removeTaskAC, tasksReducer,addTaskAC,checkTaskAC,changeSpanTitleAC } from "./state/tasks-reducer";
import { removeTodolistAC,addTodolistAC,changeTodolistTitleAC,changeTodolistFilterAC } from "./state/todolists-reducer";
import { useDispatch,useSelector } from "react-redux";
import {AppRootState} from "./state/store";

export type FilterType = "all" | "active" | "completed";

export type TodolistType={
  id:string,
  title:string,
  filter:FilterType,
}
type TypeTasks={
 [key:string]:Array<TaskType>
}

function AppRedux() {

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState,Array<TodolistType>>(state => state.todoList);
  const tasks = useSelector<AppRootState,TypeTasks>(state => state.tasks);

  const addTask=(value:string,todoId:string)=>{
  const action = addTaskAC(value,todoId);
  dispatch(action);  
  //dispatchToTaskReducer(addTaskAC(value,todoId)); 
  }
  const removeTask = (id: string,todoId:string) => {
  const action = removeTaskAC(id,todoId);
  dispatch(action);
  };
  const checkTask=(taskId:string,isDone:boolean,todoId:string)=>{
  const action = checkTaskAC(taskId, isDone,todoId);
  dispatch(action);
  }    
  const changeSpanTitle=(taskId:string,newValue:string,todoId:string)=>{
  const action = changeSpanTitleAC(taskId,newValue,todoId);
  dispatch(action);
  }

  const changeFilter = (value: FilterType,todoId:string) => {
  dispatch(changeTodolistFilterAC(value,todoId));
  }

  const removeTodolist=(todoId:string)=>{
  const action = removeTodolistAC(todoId);
  dispatch(action);
  }
  const addTodolist=(value:string)=>{
  const action = addTodolistAC(value);
  dispatch(action);  
  }

  const changeMainTitle=(newValue:string,todoId:string)=>{
  dispatch(changeTodolistTitleAC(newValue,todoId));
  }
  
  return (
    <div className="App">
      <AppBar position={'sticky'}>
        <Toolbar variant={'regular'}>
          <IconButton
            edge={'start'}
            color={'inherit'}            
            sx={{mr:3}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            Todolist on the day
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <Paper elevation={6} variant={'outlined'}
          style={{margin:'15px',padding:'10px'}}>
            <AddTaskInput addItem={addTodolist} />
          </Paper>
        </Grid>
        <Grid container spacing={3}>
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
                <Paper style={{ padding: '10px' }}>
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

export default AppRedux;
