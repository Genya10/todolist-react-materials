import { FilterType } from "./App";
import { ChangeEvent } from "react";
import { AddTaskInput } from "./AddTaskInput";
import { EditMode } from "./Edit";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Checkbox} from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { checkTaskAC,removeTaskAC,changeSpanTitleAC,addTaskAC } from "./state/tasks-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

 type PropsType={
    id:string,
    title:string,
    changeFilter:(value:FilterType,todoId:string)=>void,
    filter:FilterType ,
    removeTodolist:(gRtDoiT:string)=>void,
    changeMainTitle:(newValue:string,todoId:string)=>void,
}

export const Todolist = (props:PropsType) => {
  const tasks = useSelector<AppRootState,Array<TaskType>>(state => state.tasks[props.id]);
  const dispatch = useDispatch();

  const changeSpanTitle=(taskId:string,newValue:string,todoId:string)=>{
  const action = changeSpanTitleAC(taskId,newValue,todoId);
  dispatch(action);
  }

  const btnAll=()=>{props.changeFilter('all',props.id) };   
  const btnActive=()=>props.changeFilter('active',props.id);
  const btnCompleted=()=>props.changeFilter('completed',props.id);
  const removeTodo=()=>{props.removeTodolist(props.id)};

   const changeTitle=(newValue:string)=>{
     props.changeMainTitle(newValue,props.id)
   }

   let filterForTask = tasks;
            if (props.filter === "completed") {
              filterForTask = filterForTask.filter((t) => t.isDone === true);
            }
            if (props.filter === "active") {
              filterForTask = filterForTask.filter((t) => t.isDone === false);
            }

  return (
    <div>
      <h2 style={{textAlign:'center'}}>
        <EditMode title={props.title} 
                  changeValue={changeTitle} />
      </h2>
      <AddTaskInput addItem={(value)=>{
        dispatch(addTaskAC(value,props.id))}} />

      {filterForTask.map((task) => {
        const btnRemoveTask = () => {
          dispatch(removeTaskAC(task.id, props.id));
        };
        const onCheckTask = (e: ChangeEvent<HTMLInputElement>) => {
          let newIsDoneValue = e.currentTarget.checked;
          dispatch(checkTaskAC(task.id, e.currentTarget.checked, props.id));
        };
        const changeSpan = (newValue: string) => {
          dispatch(changeSpanTitleAC(task.id, newValue, props.id))
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
