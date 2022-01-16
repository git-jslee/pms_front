import { createAction, handleActions } from 'redux-actions';
import { apiProject } from '../lib/api/api';

const GET_PROJECT = 'projectForm/GET_PROJECT';
const GET_PROJECT_SUCCESS = 'projectForm/GET_PROJECT_SUCCESS';
const GET_PROJECT_FAILURE = 'projectForm/GET_PROJECT_FAILURE';

const PROJECT_VALUES = 'projectForm/PROJECT_INITVALUES';
const CHANGE_EDITMODE = 'projectForm/CHANGE_EDITMODE';

export const getProject = (id) => async (dispatch) => {
  dispatch({ type: GET_PROJECT });
  try {
    // 수정 필요 - 프로젝트 정보 2번 호출하는 현상
    const response = await apiProject(id);
    dispatch({
      type: GET_PROJECT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

export const projectValues = createAction(PROJECT_VALUES, (value) => value);
export const changeEditmode = createAction(CHANGE_EDITMODE, (value) => value);

const initialState = {
  mode: null,
  data: null,
  initialValues: null,
  editdisabled: true,
  status: null,
  error: null,
};

const projectForm = handleActions(
  {
    // 프로젝트 정보 가져오기 성공
    [GET_PROJECT_SUCCESS]: (state, { payload }) => ({
      ...state,
      mode: 'view',
      data: payload.data,
      status: payload.status,
    }),
    // 프로젝트 정보 가져오기 실패
    [GET_PROJECT_FAILURE]: (state, { payload }) => ({
      ...state,
      status: 'error',
      error: payload,
    }),
    //프로젝트 InitialValues
    [PROJECT_VALUES]: (state, { payload }) => ({
      ...state,
      initialValues: payload,
    }),
    //EDIT 모드 변경
    [CHANGE_EDITMODE]: (state, { payload }) => ({
      ...state,
      editdisabled: payload,
    }),
  },
  initialState,
);

export default projectForm;
