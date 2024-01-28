import { v1 } from "uuid";
import { TodolistType,FilterType  } from "../AppRedux";


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

export const todolist1=v1();
export const todolist2=v1();
export const todolist3=v1()

const initialState:Array<TodolistType> = [
  /*{id:todolist1,title:"Chores",filter:"all",},
  {id:todolist2,title:"Purchases",filter:"all",},
  {id:todolist3,title:"Study",filter:"all",},*/
]

export const todolistsReducer=(state:Array<TodolistType>=initialState ,action:ActionsType):Array<TodolistType>=>{
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
           return state;
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
export const changeTodolistFilterAC = (filter:FilterType,id:string):ChangeTodolistFilterActionType=>{
 return {type:'CHANGE_TODOLIST_FILTER',filter:filter,id:v1()}
}