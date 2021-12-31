import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import projectlist from './projectList';
import codebook from './codebook';
import addProject from './addPorject';

const rootReducer = combineReducers({
  auth,
  loading,
  projectlist,
  codebook,
  addProject,
});

export default rootReducer;
