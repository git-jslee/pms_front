import { combineReducers } from "redux";
import auth from './auth';
import loading from './loading';
import projectlist from "./projectList";

const rootReducer = combineReducers({
    auth,
    loading,
    projectlist,
})

export default rootReducer;