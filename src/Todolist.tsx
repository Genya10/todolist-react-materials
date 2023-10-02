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
    changeFilter:(value:FilterType)=>void
}

export const Todolist = (props:PropsType) => {

  let [newTaskTitle,setTaskTitle]=useState('');

  const setAddTask=()=>{
    props.addTask(newTaskTitle);
    setTaskTitle('');
  }
  const inputOnChange=(e:ChangeEvent<HTMLInputElement>)=>{setTaskTitle(e.currentTarget.value)};
  const inputOnKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      setAddTask();
      }
  }
  const btnAll=()=>props.changeFilter('all');
  const btnActive=()=>props.changeFilter('active');
  const btnCompleted=()=>props.changeFilter('completed');

  return (
    <div>
      <h2>{props.title}</h2>
      <input
        value={newTaskTitle}
        onChange={inputOnChange}
        onKeyDown={inputOnKeyDown}
      />
      <button onClick={setAddTask}>+</button>
      {props.tasks.map((task) => {
        const btnRemoveTask = () => {
          props.removeTask(task.id);
        };

        return (
          <div key={task.id}>
            {" "}
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button onClick={btnRemoveTask}>X</button>
          </div>
        );
      })}
      <div>
        <button onClick={btnAll}>All</button>
        <button onClick={btnActive}>Active</button>
        <button onClick={btnCompleted}>Completed</button>
      </div>
    </div>
  );
};