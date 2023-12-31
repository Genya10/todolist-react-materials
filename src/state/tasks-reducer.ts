import { FilterType } from './../App';
import { TaskType } from '../Todolist';
import { v1 } from 'uuid';
import { AddTodolistActionType,RemoveTodolistActionType } from './todolists-reducer';

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
type ChangeSpanActionType={
   type:'CHANGE_SPAN_TITLE',
   taskId:string,
   newValue:string,
   todoId:string
}

type ActionsTypeTask = AddTaskActionType | RemoveTaskActionType |
 CheckTaskActionType | ChangeSpanActionType | AddTodolistActionType | RemoveTodolistActionType;

 type TaskStateType ={
    [todoId:string]:TaskType[];
 }

export const tasksReducer=(state:TaskStateType,action:ActionsTypeTask):TaskStateType=>{
   switch(action.type){
    case 'ADD_TASK':{
        const stateCopy={...state};
       const tasks = stateCopy[action.id];
       const newTask ={id:v1(),title:action.value,isDone:false};
       const newTasks = [newTask,...tasks];
       stateCopy[action.id]=newTasks;
        return stateCopy;
    }
    case 'REMOVE_TASK':{
        const stateCopy ={...state};
        const tasks = state[action.todoId];
        const filteredTasks = tasks.filter(t=>t.id !== action.id);
        stateCopy[action.todoId]=filteredTasks;
        return stateCopy;
    }
    case 'CHECK_TASK':{
        let stateCopy ={...state};
        let tasks = stateCopy[action.todoId];
        let task = tasks.find(t=>t.id === action.taskId);
        if(task){
            task.isDone === action.isDone;
        }
        return stateCopy;
    }      
    case 'CHANGE_SPAN_TITLE':{
        const stateCopy ={...state}
        let tasks =stateCopy[action.taskId];
        let task = tasks.find(t=> t.id === action.taskId);
        if(task){
            task.title = action.newValue;
        }
        return stateCopy;
    }        
    case 'ADD_TODOLIST':{
       const stateCopy ={...state};
       stateCopy[action.id]=[];
       return stateCopy;
    }
    case 'REMOVE_TODOLIST':{
        const stateCopy ={...state};
        delete stateCopy[action.id];
        return stateCopy;
    }
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
export const checkTaskAC=(taskId:string,isDone:boolean,todoId:string):CheckTaskActionType=>{
   return {type:'CHECK_TASK',taskId:taskId,isDone:isDone,todoId:todoId}
}
export const changeSpanTitleAC=(taskId:string,newValue:string,todoId:string):ChangeSpanActionType=>{
   return {type:'CHANGE_SPAN_TITLE',taskId:taskId,newValue:newValue,todoId:todoId}
}
