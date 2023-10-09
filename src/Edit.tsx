import { useState } from "react";
import { ChangeEvent } from "react";

type PropsTypeEdit={
    title:string,    
    changeValue:(newValue:string)=>void,
}

export const EditMode=(props:PropsTypeEdit)=>{

    const [edit, setEdit] = useState(true);
    const [value, setValue] = useState("");

    const changeOnFalse = () => {
      setEdit(false);
      setValue(props.title);
    };
    const changeOnTrue = () => {
      setEdit(true);
      props.changeValue(value);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
      setValue(e.currentTarget.value);
                
    return (
      <span >
        {edit ? (
          <span onDoubleClick={changeOnFalse}>{props.title}</span>
        ) : (
          <input
            value={value}
            onDoubleClick={changeOnTrue}
            onChange={onChangeHandler}
            onBlur={changeOnTrue}
            autoFocus
          />
        )}
        
      </span>
    );
}