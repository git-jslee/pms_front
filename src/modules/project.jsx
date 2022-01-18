// projectList, projectForm module 통합작업
import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import createRequestThunk from '../lib/api/createRequestThunk';

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
    const response = await api.getListPathId('projects', id);
    dispatch({
      type: GET_PROJECTID_SUCCESS,
      payload: response,
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

export const getProjectWork = (id) => async (dispatch) => {
  dispatch({ type: GET_PROJECTWORK }); // 요청 시작을 알림
  dispatch(startLoading(GET_PROJECTWORK));
  try {
    // 수정 필요
    const res_task = await api.getProjectWork('project-tasks', id);
    const res_work = await api.getProjectWork('works', id);
    dispatch({
      type: GET_PROJECTWORK_SUCCESS,
      payload1: res_task,
      payload2: res_work,
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
  error: null,
};

const project = handleActions(
  {
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
        projectInfo: payload.data,
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
        tasks: payload1.data,
        works: payload2.data,
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
