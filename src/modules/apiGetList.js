import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import moment from 'moment';

// 리스트 가져오기..
// 유지보수 리스트
const GET_MAINTENANCE = 'api/GET_MAINTENANCE';
const GET_MAINTENANCE_SUCCESS = 'api/GET_MAINTENANCE_SUCCESS';
const GET_MAINTENANCE_FAILURE = 'api/GET_MAINTENANCE_FAILURE';

// 유지보수
export const getMaintenanceList = (query) => async (dispatch) => {
  dispatch({ type: GET_MAINTENANCE }); //요청시작 알림
  dispatch(startLoading(GET_MAINTENANCE)); // loading true

  try {
    const path = 'api/maintenances';
    const response = await api.getQueryString(path, query);
    dispatch({
      type: GET_MAINTENANCE_SUCCESS,
      payload: response.data,
    }); // 요청성공
    dispatch(finishLoading(GET_MAINTENANCE)); // loading false
  } catch (error) {
    dispatch({
      type: GET_MAINTENANCE_FAILURE,
      payload: error,
      error: true,
    }); // 요청실패
    dispatch(startLoading(GET_MAINTENANCE)); // loading true
    throw error;
  }
};

const initialState = {
  data: null,
  datas: null,
  mode: null,
  error: null,
};

const apiGetList = handleActions(
  {
    // 유지보수 리스트 가져오기 성공/실패
    [GET_MAINTENANCE_SUCCESS]: (state, { payload }) => ({
      ...state,
      datas: payload.data,
    }),
    [GET_MAINTENANCE_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
  },
  initialState,
);

export default apiGetList;
