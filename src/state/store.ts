import { combineReducers,legacy_createStore} from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todoList:todolistsReducer
})

type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer);

//@ts-ignore
window.store = store;