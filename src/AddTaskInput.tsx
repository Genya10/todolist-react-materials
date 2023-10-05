import { useState } from "react";
import { ChangeEvent,KeyboardEvent } from "react";

type PropsTypeInput={
    addItem:(value:string)=>void,
  }
  
 export const AddTaskInput =(props:PropsTypeInput)=>{
    let [newTaskTitle,setTaskTitle] = useState('');
    let [error,setError] = useState('');
  
    const setAddTask=()=>{
      if(newTaskTitle.trim()!==''){
        props.addItem(newTaskTitle,);
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
  }