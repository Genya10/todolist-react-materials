import { FilterType } from './../App';
import { TaskType } from '../Todolist';

type AddTaskActionType={
   type:'ADD_TASK',
   value:string,
   id:string
}
type RemoveTaskActionType={
    type:'REMOVE_TASK',
    id:string,
    todoId:string
}
type CheckTaskActionType={
    type:'CHECK_TASK',
    taskId:string,
    isDone:boolean,
    todoId:string
}
type ChangeFilterActionType={
   type:'CHANGE_FILTER',
   value:FilterType,
   todoId:boolean
}
type ActionsTypeTask = AddTaskActionType | RemoveTaskActionType |
 CheckTaskActionType | ChangeFilterActionType;
 
 type TaskStateType ={
    [todoId:string]:TaskType[];
 }

export const tasksReducer=(state:TaskStateType,action:ActionsTypeTask):TaskStateType=>{
   switch(action.type){
    case 'ADD_TASK':
        return {...state}
    case 'REMOVE_TASK':
        const stateCopy ={...state};
        const tasks = state[action.todoId];
        const filteredTasks = tasks.filter(t=>t.id !== action.id);
        stateCopy[action.todoId]=filteredTasks;
        return stateCopy;
    case 'CHECK_TASK':
        return {...state}
    case 'CHANGE_FILTER':
        return {...state}
    default :
        return state;
   }
}

export const addTaskAC=(value:string,id:string):AddTaskActionType=>{
   return {type:'ADD_TASK',value:value,id:id}
}
export const removeTaskAC=(id:string,todoId:string):RemoveTaskActionType=>{
  return {type:'REMOVE_TASK',id:id,todoId:todoId}
}
export const checkTask=(taskId:string,isDone:boolean,todoId:string):CheckTaskActionType=>{
   return {type:'CHECK_TASK',taskId:taskId,isDone:isDone,todoId:todoId}
}
export const changeFilter=(value:FilterType,todoId:boolean):ChangeFilterActionType=>{
   return {type:'CHANGE_FILTER',value:value,todoId:todoId}
}