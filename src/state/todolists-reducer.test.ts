import { todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistType } from "../App";

test('correct todolists should be removed',()=>{
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState:Array<TodolistType>=[
    {id:todolistId1,title:'Chores',filter:'all'},
    {id:todolistId2,title:'Purchases',filter:'all'},
   ]

   const endState = todolistsReducer(startState,{type:'REMOVE_TODOLIST',id:todolistId1});

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
1