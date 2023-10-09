
import { FilterType } from "./App";
import { ChangeEvent,KeyboardEvent  } from "react";
import { AddTaskInput } from "./AddTaskInput";
import { EditMode } from "./Edit";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Checkbox} from "@mui/material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

 type PropsType={
    title:string,
    tasks:Array<TaskType>,
    addTask:(value:string,todoId:string)=>void,
    removeTask:(id:string,todoId:string)=> void,
    changeFilter:(value:FilterType,todoId:string)=>void,
    checkTask:(taskId:string,isDone:boolean,todoId:string)=>void,
    filter:FilterType ,
    id:string,
    removeTodolist:(gRtDoiT:string)=>void,
    changeSpanTitle:(taskId:string,newValue:string,todoId:string)=>void,
    changeMainTitle:(newValue:string,todoId:string)=>void,
}

export const Todolist = (props:PropsType) => {

  const btnAll=()=>{props.changeFilter('all',props.id) };   
  const btnActive=()=>props.changeFilter('active',props.id);
  const btnCompleted=()=>props.changeFilter('completed',props.id);
  const removeTodo=()=>{props.removeTodolist(props.id)};
  const addTaskTodo=(value:string)=>{
    props.addTask(value,props.id);
  }
   const changeTitle=(newValue:string)=>{
     props.changeMainTitle(newValue,props.id)
   }

  return (
    <div>
      <h2 style={{textAlign:'center'}}>
        <EditMode title={props.title} 
                  changeValue={changeTitle} />
      </h2>
      <AddTaskInput addItem={addTaskTodo} />

      {/*props.tasks.map */}
      {props.tasks.map((task) => {
        const btnRemoveTask = () => {
          props.removeTask(task.id, props.id);
        };
        const onCheckTask = (e: ChangeEvent<HTMLInputElement>) => {
          props.checkTask(task.id, e.currentTarget.checked, props.id);
        };
        const changeSpan = (newValue: string) => {
          props.changeSpanTitle(task.id, newValue, props.id);
        };

        return (
          <div key={task.id}>
            <Checkbox checked={task.isDone} 
                      onChange={onCheckTask} />
            <EditMode changeValue={changeSpan} 
                      title={task.title} />
            <IconButton onClick={btnRemoveTask}>
              <Delete />
            </IconButton>
          </div>
        );
      })}

      <div>
        <Button variant={props.filter === "all" ? "contained" : "text"}
          onClick={btnAll}
        >
          All
        </Button>
        <Button variant={props.filter==="active" ? "contained": "text"}
          onClick={btnActive}
        >
          Active
        </Button>
        <Button variant={props.filter==="completed" ? "contained": "text"}
                onClick={btnCompleted}
        >
          Completed
        </Button>
      </div>
        <Button size={'large'}
                style={{marginTop:'15px',marginLeft:'40px'}}
                color={'secondary'}
                onClick={removeTodo} 
                variant={'contained'}
                startIcon={<Delete />}>
          Remove
        </Button>
    </div>
  );
};
