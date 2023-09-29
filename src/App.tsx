import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';

function App() {

  let task1:Array<TaskType>=[
    {id:1,title:'React',isDone:true},
    {id:2,title:'Redux',isDone:false},
    {id:3,title:'Typescript',isDone:true},
  ]
  let task2:Array<TaskType>=[
    {id:1,title:'GIT',isDone:true},
    {id:2,title:'Figma',isDone:false},
    {id:3,title:'QA',isDone:true},
  ]

 
  return (
    <div className="App">
      <Todolist title="English" tasks={task1}/>
      <Todolist title="Frontend" tasks={task2}/>
    </div>
  );
}

export default App;
