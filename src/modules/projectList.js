import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
// import { apiProjectList } from '../lib/api/api';
import { startLoading, finishLoading } from './loading';

const GET_PROJECTLIST = 'project_list/GET_PROJECTLIST';
const GET_PROJECTLIST_SUCCESS = 'project_list/GET_PROJECTLIST_SUCCESS';
const GET_PROJECTLIST_FAILURE = 'project_list/GET_PROJECTLIST_FAILURE';

export const getProjectList = () => async (dispatch) => {
  dispatch({ type: GET_PROJECTLIST }); // 요청 시작을 알림
  dispatch(startLoading(GET_PROJECTLIST));
  try {
    // const response = await apiProjectList();
    const response = await api.getList('projects');
    dispatch({
      type: GET_PROJECTLIST_SUCCESS,
      payload: response,
    }); // 요청 성공
    dispatch(finishLoading(GET_PROJECTLIST));
  } catch (error) {
    dispatch({
      type: GET_PROJECTLIST_FAILURE,
      payload: error,
      error: true,
    }); // 요청 실패
    dispatch(startLoading(GET_PROJECTLIST));
    throw error;
  }
};

const initialState = {
  data: '',
  error: null,
};

const projectlist = handleActions(
  {
    // 프로젝트 리스트 가져오기 성공시
    [GET_PROJECTLIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: payload.data,
    }),
    // 프로젝트 리스트 가져오기 실패시
    [GET_PROJECTLIST_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export default projectlist;
