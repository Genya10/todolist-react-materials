import React, { useState } from "react";

export type TaskType={
id:number,
title:string,
isDone:boolean
}

type PropsType={
    title:string,
    tasks:Array<TaskType>,
}

export const Todolist = (props:PropsType) => {

  return (
    <div>

      <h2>{props.title}</h2>
      <input type="text" />
      <button>+</button>
      <div>
       <div><input type="checkbox" checked={true} />
        <span>html</span></div> 

      </div>
      <div>
        <button>
                 All
        </button>
        <button >Active</button>
        <button >Completed</button>
      </div>
    </div>
  );
};