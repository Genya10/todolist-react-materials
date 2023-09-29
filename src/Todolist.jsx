import React, { useState } from "react";

export const Todolist=()=>{
    const [check,setCheck]=useState(true);

    return (
        <div>
           <h2>What to learn</h2>
           <input type="text" />
           <button>+</button>
           <div>
           <input type="checkbox" checked={true}/>
           <span>HTML</span>
           </div>
           <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
           </div>
        </div>
    )
}