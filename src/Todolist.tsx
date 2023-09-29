import React, { useState } from "react";

export type TaskType={
id:number,
title:string,
isDone:boolean
}

type PropsType={
    title:string,
    tasks:Array<TaskType>,
    deleteTask:()=> void
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
        <button onClick={()=>{alert(task.title)}}>X</button>
        </div>
      })
      }
      <div>
        <button> All</button>       
        <button >Active</button>
        <button >Completed</button>
      </div>

    </div>
  );
};