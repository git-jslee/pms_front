// projectList, projectForm module 통합작업
import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import createRequestThunk from '../lib/api/createRequestThunk';

// 프로젝트 리스트
const GET_PROJECT = 'project/GET_PROJECT';
const GET_PROJECT_SUCCESS = 'project/GET_PROJECT_SUCCESS';
const GET_PROJECT_FAILURE = 'project/GET_PROJECT_FAILURE';

const GET_WORK = 'project/GET_WORK';
const GET_WORK_SUCCESS = 'project/GET_WORK_SUCCESS';
const GET_WORK_FAILURE = 'project/GET_WORK_FAILURE';

const GET_PWORKLIST = 'project/GET_PWORKLIST';
const GET_PWORKLIST_SUCCESS = 'project/GET_PWORKLIST_SUCCESS';
const GET_PWORKLIST_FAILURE = 'project/GET_PWORKLIST_FAILURE';

// 프로젝트 리스트
const GET_PROJECTLIST = 'project/GET_PROJECTLIST';
const GET_PROJECTLIST_SUCCESS = 'project/GET_PROJECTLIST_SUCCESS';
const GET_PROJECTLIST_FAILURE = 'project/GET_PROJECTLIST_FAILURE';

// 프로젝트 ID
const GET_PROJECTID = 'project/GET_PROJECTID';
const GET_PROJECTID_SUCCESS = 'project/GET_PROJECTID_SUCCESS';
const GET_PROJECTID_FAILURE = 'project/GET_PROJECTID_FAILURE';

// 프로젝트 ID 별 tasks & works
const GET_PROJECTWORK = 'project/GET_PROJECTWORK';
const GET_PROJECTWORK_SUCCESS = 'project/GET_PROJECTWORK_SUCCESS';
const GET_PROJECTWORK_FAILURE = 'project/GET_PROJECTWORK_FAILURE';

// 프로젝트 정보 가져오기 통합
export const getProject = (query) => async (dispatch) => {
  dispatch({ type: GET_PROJECT }); //요청 시작을 알림
  dispatch(startLoading(GET_PROJECT)); //loading true
  try {
    const response = await api.getQueryString('api/projects', query);
    // const response = await api.getList(params);
    console.log('response', response);
    dispatch({
      type: GET_PROJECT_SUCCESS,
      payload: response.data.data,
    }); // 요청 성공
    dispatch(finishLoading(GET_PROJECT)); //loading false
  } catch (error) {
    console.log('error-getproject', error);
    dispatch({
      typd: GET_PROJECT_FAILURE,
      payload: error,
      error: true,
    }); //요청 실패
    dispatch(startLoading(GET_PROJECT)); // loading true
    throw error;
  }
};

// 기간별 작업 정보 가져오기
export const getWork = (query) => async (dispatch) => {
  dispatch({ type: GET_WORK });
  dispatch(startLoading(GET_WORK));
  try {
    const response = await api.getQueryString('api/works', query);
    console.log('**getWorkList**', response.data.data);
    dispatch({
      type: GET_WORK_SUCCESS,
      payload: response.data.data,
    });
    dispatch(finishLoading(GET_WORK));
  } catch (error) {
    dispatch({
      typd: GET_WORK_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_WORK));
    throw error;
  }
};

// 기간별 작업 정보 가져오기
// http://192.168.20.99:1337/works?workingDay_gte=2022-02-25&workingDay_lte=${end}`)
export const getProjectWorkList = (params) => async (dispatch) => {
  dispatch({ type: GET_PWORKLIST });
  dispatch(startLoading(GET_PWORKLIST));
  try {
    const response = await api.getList(params);
    console.log('getProjectWorkList', response.data);
    dispatch({
      type: GET_PWORKLIST_SUCCESS,
      payload: response.data,
    });
    dispatch(finishLoading(GET_PWORKLIST));
  } catch (error) {
    dispatch({
      typd: GET_PWORKLIST_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_PWORKLIST));
    throw error;
  }
};

// 삭제예정 -> getProject 로 변경
export const getProjectList = () => async (dispatch) => {
  dispatch({ type: GET_PROJECTLIST }); // 요청 시작을 알림
  dispatch(startLoading(GET_PROJECTLIST)); // ladding true
  try {
    const response = await api.getList('projects');
    dispatch({
      type: GET_PROJECTLIST_SUCCESS,
      payload: response,
    }); // 요청 성공
    dispatch(finishLoading(GET_PROJECTLIST)); // loading false
  } catch (error) {
    dispatch({
      type: GET_PROJECTLIST_FAILURE,
      payload: error,
      error: true,
    }); // 요청 실패
    dispatch(startLoading(GET_PROJECTLIST)); // loading true
    throw error;
  }
};

// export const getProjectList = createRequestThunk(GET_PROJECTLIST, api.getList);
// console.log('getProjectList', getProjectList());

export const getProjectId = (id) => async (dispatch) => {
  dispatch({ type: GET_PROJECTID }); // 요청 시작을 알림
  dispatch(startLoading(GET_PROJECTID));
  try {
    const response = await api.getListPathId('api/projects', id);
    dispatch({
      type: GET_PROJECTID_SUCCESS,
      payload: response.data.data,
    });
    dispatch(finishLoading(GET_PROJECTID));
  } catch (error) {
    dispatch({
      type: GET_PROJECTID_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_PROJECTID));
    throw error;
  }
};

export const getProjectWork = (query) => async (dispatch) => {
  dispatch({ type: GET_PROJECTWORK }); // 요청 시작을 알림
  dispatch(startLoading(GET_PROJECTWORK));
  try {
    // 수정 필요
    const res_task = await api.getQueryString('api/project-tasks', query[0]);
    const res_work = await api.getQueryString('api/works', query[1]);
    dispatch({
      type: GET_PROJECTWORK_SUCCESS,
      payload1: res_task.data.data,
      payload2: res_work.data.data,
    });
    dispatch(finishLoading(GET_PROJECTWORK));
  } catch (error) {
    dispatch({
      type: GET_PROJECTWORK_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_PROJECTWORK));
    throw error;
  }
};

const initialState = {
  data: '',
  list: null,
  wlist: null,
  error: null,
  werror: null,
};

const project = handleActions(
  {
    // 프로젝트 리스트 가져오기 성공
    [GET_PROJECT_SUCCESS]: (state, { payload }) => ({
      ...state,
      list: payload,
    }),
    // 프로젝트 리스트 가져오기 실패
    [GET_PROJECT_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 작업 리스트 가져오기 성공
    [GET_WORK_SUCCESS]: (state, { payload }) => ({
      ...state,
      wlist: payload,
    }),
    // 작업 리스트 가져오기 실패
    [GET_WORK_FAILURE]: (state, { payload }) => ({
      ...state,
      werror: true,
    }),
    // 작업 리스트 가져오기 성공
    [GET_PWORKLIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      wlist: payload,
    }),
    // 작업 리스트 가져오기 실패
    [GET_PWORKLIST_FAILURE]: (state, { payload }) => ({
      ...state,
      werror: true,
    }),
    // 프로젝트 리스트 가져오기 성공
    [GET_PROJECTLIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: { list: payload.data },
    }),
    // 프로젝트 리스트 가져오기 실패
    [GET_PROJECTLIST_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 프로젝트 ID 가져오기 성공
    [GET_PROJECTID_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        projectInfo: payload,
      },
      error: false,
    }),
    // 프로젝트 ID 가져오기 실패
    [GET_PROJECTID_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 프로젝트 tasks & work 정보
    [GET_PROJECTWORK_SUCCESS]: (state, { payload1, payload2 }) => ({
      ...state,
      data: {
        ...state.data,
        tasks: payload1,
        works: payload2,
      },
      error: false,
    }),
    // 프로젝트 tasks & work 실패
    [GET_PROJECTWORK_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
  },
  initialState,
);

export default project;
