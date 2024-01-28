import { TaskType } from '../Todolist';
import { TaskStateType } from '../AppRedux';
import { v1 } from 'uuid';
import { AddTodolistActionType,RemoveTodolistActionType } from './todolists-reducer';
import { todolist1,todolist2,todolist3 } from './todolists-reducer';

type RemoveTaskActionType={
    type:'REMOVE_TASK',
    id:string,
    todoId:string
}
type AddTaskActionType={
   type:'ADD_TASK',
   value:string,
   id:string
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
   todoId:string,
}

type ActionsTypeTask =  RemoveTaskActionType |AddTaskActionType |
 CheckTaskActionType | ChangeSpanActionType | AddTodolistActionType | RemoveTodolistActionType;

 /*type TaskStateType ={
    [todoId:string]:TaskType[];
 }*/

const initialState:TaskStateType = {
    /*[todolist1]:[
      { id: v1(), title: "Vacuum", isDone: true },
      { id: v1(), title: "Cook", isDone: false },
      { id: v1(), title: "Vacuum", isDone: true },
    ],
    [todolist2]:[
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false },
      { id: v1(), title: "Cupcake", isDone: true },
    ],
    [todolist3]:[
      { id: v1(), title: "English", isDone: false },
      { id: v1(), title: "React", isDone: true},
      { id: v1(), title: "Typescript", isDone: true },
    ]*/
  }

export const tasksReducer=(state:TaskStateType = initialState,action:ActionsTypeTask):TaskStateType=>{
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
            task.isDone = action.isDone;
        }
        return stateCopy;
    }      
    case 'CHANGE_SPAN_TITLE':{
        const stateCopy ={...state}
        let tasks =stateCopy[action.todoId];
        stateCopy[action.todoId] = tasks.map(t => t.id === action.taskId ? {...t, title:action.newValue}: t)
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
