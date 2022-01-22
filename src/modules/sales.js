import { handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';

// 매출현황 리스트
const GET_SALESLIST = 'sales/GET_SALESLIST';
const GET_SALESLIST_SUCCESS = 'sales/GET_SALESLIST_SUCCESS';
const GET_SALESLIST_FAILURE = 'sales/GET_SALESLIST_FAILURE';

export const getSalesList = () => async (dispatch) => {
  dispatch({ type: GET_SALESLIST }); //요청 시작을 알림
  dispatch(startLoading(GET_SALESLIST)); //loading true
  try {
    const response = await api.getList('sales-performances');
    dispatch({
      type: GET_SALESLIST_SUCCESS,
      payload: response,
    }); // 요청성공
    dispatch(finishLoading(GET_SALESLIST)); // loading false
  } catch (error) {
    dispatch({
      type: GET_SALESLIST_FAILURE,
      payload: error,
      error: true,
    }); // 요청실패
    dispatch(startLoading(GET_SALESLIST)); // loading true
    throw error;
  }
};

const initialState = {
  data: '',
  error: null,
};

const sales = handleActions(
  {
    // 영업현황 리스트 가져오기 성공
    [GET_SALESLIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: payload.data,
    }),
    // 엽업현황 리스트 가져오기 실패
    [GET_SALESLIST_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
  },
  initialState,
);

export default sales;
