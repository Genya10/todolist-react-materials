import  { useState } from "react";
import { FilterType } from "./App";
import { ChangeEvent,KeyboardEvent  } from "react";
import { AddTaskInput } from "./AddTaskInput";

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
          className={props.filter === "completed" ? "choosed" : ""}>Completed</button>                         
      </div>
      
    </div>
  );
};

/*type PropsTypeInput={
  addTask:(value:string,todoId:string)=>void,
  id:string,
}
const AddTaskInput =(props:PropsTypeInput)=>{
  let [newTaskTitle,setTaskTitle] = useState('');
  let [error,setError] = useState('');

  const setAddTask=()=>{
    if(newTaskTitle.trim()!==''){
      props.addTask(newTaskTitle,props.id);
      setTaskTitle('');
    }else{
      setError('Field is required');
    }
  }  
  const inputOnChange=(e:ChangeEvent<HTMLInputElement>)=>{setTaskTitle(e.currentTarget.value);
   setError('')};
  const inputOnKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){setAddTask()}
  } 

  return(
    <div>  
      <input
        value={newTaskTitle}
        onChange={inputOnChange}
        onKeyDown={inputOnKeyDown}
        className={error ? "error" : ""}
      />
      <button onClick={setAddTask}>+</button>
      {error && <div className="error-write">{error}</div>}
    </div>
  )
}*/