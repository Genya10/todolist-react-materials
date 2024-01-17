import { Todolist } from "./Todolist";
import { AddTaskInput } from "./AddTaskInput";
import { TaskType } from "./Todolist";
import { AppBar,Toolbar,IconButton,Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import { removeTodolistAC,addTodolistAC,changeTodolistTitleAC,changeTodolistFilterAC } from "./state/todolists-reducer";
import { useDispatch,useSelector } from "react-redux";
import {AppRootState} from "./state/store";

export type FilterType = "all" | "active" | "completed";

export type TodolistType={
  id:string,
  title:string,
  filter:FilterType,
}

function AppRedux() {

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState,Array<TodolistType>>(state => state.todoList);

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
          <Paper elevation={6} 
          style={{margin:'15px',padding:'10px'}}>
            <AddTaskInput addItem={addTodolist} />
          </Paper>
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {

            return (
              <Grid item 
                  key={tl.id}>
                <Paper style={{ padding: '10px' }}>
                  <Todolist                    
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
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
