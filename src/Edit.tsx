import { useState } from "react";

type PropsTypeEdit={
    title:string,    
}

export const EditSpan=(props:PropsTypeEdit)=>{

    const [edit,setEdit]=useState(true);
    const [value,setValue]=useState('123');
        
        const changeSpan=()=>{setEdit(false)};
        const changeInput=()=>{setEdit(true)};

        

    return(
        <div className="btn-span">
    {edit ? 
    <span onDoubleClick={changeSpan}>{props.title}</span> 
    : <input onDoubleClick={changeInput} value={value}
    onChange={(e)=>{setValue(e.currentTarget.value)}}/>}
        </div>
    )
}