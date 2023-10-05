import  { useState } from "react";
import { FilterType } from "./App";
import { ChangeEvent,KeyboardEvent  } from "react";
import { AddTaskInput } from "./AddTaskInput";
import { EditSpan } from "./Edit";

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
    removeTodolist:(gRtDoiT:string)=>void
}

export const Todolist = (props:PropsType) => {
  
  const [edit,setEdit]=useState(true);
  const changeEdit=()=>{
    setEdit(false)};
  const btnAll=()=>{props.changeFilter('all',props.id) };   
  const btnActive=()=>props.changeFilter('active',props.id);
  const btnCompleted=()=>props.changeFilter('completed',props.id);
  const removeTodo=()=>{props.removeTodolist(props.id)};
  const addTaskTodo=(value:string)=>{
    props.addTask(value,props.id);
  }

  return (
    <div>
      <h2>{props.title}<button onClick={removeTodo}
      >Remove</button></h2>    
     <AddTaskInput addItem={addTaskTodo}/>     
    
      {/*props.tasks.map */}
      {props.tasks.map((task) => {
        const btnRemoveTask = () => {
          props.removeTask(task.id,props.id);
        };
        const onCheckTask = (e: ChangeEvent<HTMLInputElement>) => {
          props.checkTask(task.id,e.currentTarget.checked,props.id);
        };

        return (
          <div key={task.id}
          className={task.isDone === true ? "pale":""}>
            {" "}
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={onCheckTask}
            />        
            <EditSpan  title={task.title}
           />           
            <button  onClick={btnRemoveTask}>X</button>
          </div>
        );
      })}
       
      <div>
        <button onClick={btnAll}          
          className={props.filter === "all" ? "choosed" : ""}> All </button>                      
        <button onClick={btnActive
         }
          className={props.filter === "active" ? "choosed" : ""}>Active</button>               
        <button onClick={btnCompleted}         
          className={props.filter === "completed" ? "choosed" : ""}>Completed</button>                         
      </div>
      
    </div>
  );
};
