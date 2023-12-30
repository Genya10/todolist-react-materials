import { v1 } from "uuid";
import { TodolistType,FilterType  } from "../App";

export type RemoveTodolistActionType={
  type:'REMOVE_TODOLIST',
  id:string
}
export type AddTodolistActionType={
  type:'ADD_TODOLIST',
  id:string,
  title:string
}
export type ChangeTodolistTitleActionType={
  type:'CHANGE_TODOLIST_TITLE',
  id:string,
  title:string
}
export type ChangeTodolistFilterActionType={
  type:'CHANGE_TODOLIST_FILTER',
  id:string,
  filter:FilterType
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType |
ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistsReducer=(state:Array<TodolistType>,action:ActionsType):Array<TodolistType>=>{
  switch(action.type){
       case 'REMOVE_TODOLIST':
        return state.filter(tl=>tl.id !== action.id);
        case 'ADD_TODOLIST':
          return [...state,{
            id:action.id,
            title:action.title,
            filter:'all'
          }]
        case 'CHANGE_TODOLIST_TITLE':{
          const todolist = state.find(tl => tl.id === action.id);
          if(todolist){
            todolist.title = action.title;
          }
        }
          return [...state]
          case 'CHANGE_TODOLIST_FILTER':
          const todolist = state.find(tl=> tl.id === action.id);
          if(todolist){
            todolist.filter = action.filter;
          }
          return [...state]
        default:
           throw new Error("I don't undestand")
  }
}

export const removeTodolistAC = (todolistId:string):RemoveTodolistActionType=>{
  return {type:'REMOVE_TODOLIST',id:todolistId}
}
export const addTodolistAC = (title:string):AddTodolistActionType=>{
  return {type:'ADD_TODOLIST',title:title,id:v1()}
}
export const changeTodolistTitleAC = (id:string, title:string):ChangeTodolistTitleActionType=>{
  return {type:'CHANGE_TODOLIST_TITLE',title:title, id:v1()}
}
export const changeTodolistFilterAC = (id:string, filter:FilterType):ChangeTodolistFilterActionType=>{
 return {type:'CHANGE_TODOLIST_FILTER',filter:filter,id:v1()}
}