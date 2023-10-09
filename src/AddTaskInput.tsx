import { useState } from "react";
import { ChangeEvent,KeyboardEvent } from "react";
import { IconButton } from "@mui/material";
import {TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
        <TextField style={{marginBottom:'10px'}}
          variant={"standard"}
          label={"enter value"}
          value={newTaskTitle}
          onChange={inputOnChange}
          onKeyDown={inputOnKeyDown}
          error={!!error}        
          helperText={error}  
        />
        <IconButton color={'success'}
                    onClick={setAddTask}>
            <AddCircleIcon />
         </IconButton>
      </div>
    )
  }