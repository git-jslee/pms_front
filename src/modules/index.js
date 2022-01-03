import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import projectlist from './projectList';
import codebook from './codebook';
import addProject from './addPorject';
import project from './projectForm';
import customerList from './customerList';

const rootReducer = combineReducers({
  auth,
  loading,
  projectlist,
  codebook,
  addProject,
  project,
  customerList,
});

export default rootReducer;
