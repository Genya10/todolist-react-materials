import React, { useState } from "react";
import { FilterType } from "./App";
import { ChangeEvent,KeyboardEvent  } from "react";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType={
    title:string,
    tasks:Array<TaskType>,
    addTask:(value:string)=>void,
    removeTask:(id:string)=> void,
    changeFilter:(value:FilterType)=>void,
    checkTask:(taskId:string,isDone:boolean)=>void,
    filter:FilterType ,
}

export const Todolist = (props:PropsType) => {

  let [newTaskTitle,setTaskTitle] = useState('');
  let [error,setError] = useState('');

  const setAddTask=()=>{
    if(newTaskTitle.trim()!==''){
      props.addTask(newTaskTitle);setTaskTitle('');
    }else{
      setError('Field is required');
    }
  }
     
  const inputOnChange=(e:ChangeEvent<HTMLInputElement>)=>{setTaskTitle(e.currentTarget.value);
   setError('')};
  const inputOnKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){setAddTask()}
  } 
  
  const btnAll=()=>{props.changeFilter('all') };   
  const btnActive=()=>props.changeFilter('active');
  const btnCompleted=()=>props.changeFilter('completed');
  
  return (
    <div>
      <h2>{props.title}</h2>
      <input
        value={newTaskTitle}
        onChange={inputOnChange}
        onKeyDown={inputOnKeyDown}
        className={error ? "error" : ""}
      />
      <button onClick={setAddTask}>+</button>
      {error && <div className="error-write">{error}</div>}

      {/*props.tasks.map */}
      {props.tasks.map((task) => {
        const btnRemoveTask = () => {
          props.removeTask(task.id);
        };
        const onCheckTask = (e: ChangeEvent<HTMLInputElement>) => {
          props.checkTask(task.id, e.currentTarget.checked);
        };

        return (
          <div key={task.id}>
            {" "}
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={onCheckTask}
            />
            <span>{task.title}</span>
            <button onClick={btnRemoveTask}>X</button>
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
          className={props.filter === "completed" ? "choosed" : ""}> Completed</button>                 
        
      </div>
    </div>
  );
};