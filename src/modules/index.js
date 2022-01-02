import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import projectlist from './projectList';
import codebook from './codebook';
import addProject from './addPorject';
import project from './projectForm';

const rootReducer = combineReducers({
  auth,
  loading,
  projectlist,
  codebook,
  addProject,
  project,
});

export default rootReducer;
