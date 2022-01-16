import { createAction, handleActions } from 'redux-actions';

// 작업등록폼에서 고객사 선택시
const SET_CUSTOMER = 'work/SET_CUSTOMER';
const SET_PROJECT = 'work/SET_PROJECT';
const SET_TASK = 'work/SET_TASK';
const SET_WORKER = 'work/SET_WORKER';
const SET_INIT = 'work/SET_INIT';

export const setCustomer = createAction(
  SET_CUSTOMER,
  (customerId) => customerId,
);
export const setProject = createAction(SET_PROJECT, (projectId) => projectId);
export const setTask = createAction(SET_TASK, (taskId) => taskId);
export const set_worker = createAction(SET_WORKER, (userInfoId) => userInfoId);
export const set_init = createAction(SET_INIT);

const initialState = {
  customerId: null,
  //   projectId: null,
  taskId: null,
  formDisabled: {
    project: true,
    task: true,
    progress: true,
  },
  progress: null,
};

const work = handleActions(
  {
    [SET_INIT]: (state, action) => ({
      ...state,
      formDisabled: {
        project: true,
        task: true,
        progress: true,
      },
    }),
    [SET_CUSTOMER]: (state, action) => ({
      ...state,
      customerId: action.payload.customerId,
      //   projectId: null,
      taskId: null,
      formDisabled: {
        project: false,
        task: true,
        progress: true,
      },
    }),
    [SET_PROJECT]: (state, action) => ({
      ...state,
      projectId: action.payload.projectId,
      taskId: null,
      formDisabled: {
        project: false,
        task: false,
        progress: true,
      },
    }),
    [SET_TASK]: (state, action) => ({
      ...state,
      taskId: action.payload.taskId,
      formDisabled: {
        project: false,
        task: false,
        progress: false,
      },
      progress: action.payload.progress,
    }),
    [SET_WORKER]: (state, action) => ({
      ...state,
      selectedUserId: action.payload.userInfoId,
    }),
  },
  initialState,
);

export default work;
