import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import codebook from './codebook';
import project from './project';
//
import projectlist from './projectList';
import addProject from './addPorject';
import projectForm from './projectForm';
import customerList from './customerList';
import work from './work';
import sales from './sales';

const rootReducer = combineReducers({
  auth,
  loading,
  project,
  projectlist,
  codebook,
  addProject,
  projectForm,
  customerList,
  work,
  sales,
});

export default rootReducer;
