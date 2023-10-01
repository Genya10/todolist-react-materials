import React, { useState } from "react";
import { FilterType } from "./App";

export type TaskType={
id:number,
title:string,
isDone:boolean,
}

type PropsType={
    title:string,
    tasks:Array<TaskType>,
    removeTask:(id:number)=> void,
    changeFilter:(value:FilterType)=>void

}

export const Todolist = (props:PropsType) => {

  return (
    <div>
      <h2>{props.title}</h2>
      <input type="text" />
      <button>+</button>
      {
      props.tasks.map((task)=>{
      return     <div key={task.id}> <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={()=>{props.removeTask(task.id)}}>X</button>
        </div>
      })
      }
      <div>
        <button onClick={()=>{props.changeFilter('all')}}>All</button>       
        <button onClick={()=>{props.changeFilter('active')}}>Active</button>
        <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
      </div>

    </div>
  );
};