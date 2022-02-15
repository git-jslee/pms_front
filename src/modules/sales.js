import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import moment from 'moment';

// 매출현황 리스트
const GET_SALESLIST = 'sales/GET_SALESLIST';
const GET_SALESLIST_SUCCESS = 'sales/GET_SALESLIST_SUCCESS';
const GET_SALESLIST_FAILURE = 'sales/GET_SALESLIST_FAILURE';

// 매출현황 리스트 월&확률 조회
const GET_SALESPARAMS = 'sales/GET_SALESPARAMS';
const GET_SALESPARAMS_SUCCESS = 'sales/GET_SALESPARAMS_SUCCESS';
const GET_SALESPARAMS_FAILURE = 'sales/GET_SALESPARAMS_FAILURE';

// 매출현황-salesStatistics 계산용..
const GET_SALESSTATISTICS = 'sales/GET_SALESSTATISTICS';
const GET_SALESSTATISTICS_SUCCESS = 'sales/GET_SALESSTATISTICS_SUCCESS';
const GET_SALESSTATISTICS_FAILURE = 'sales/GET_SALESSTATISTICS_FAILURE';

// 매출 건 호출
const GET_SALESID = 'sales/GET_SALESID';
const GET_SALESID_SUCCESS = 'sales/GET_SALESID_SUCCESS';
const GET_SALESID_FAILURE = 'sales/GET_SALESID_FAILURE';

// 매출현황 요약..100%, 90%, 70%, 50%,..
const SET_SALESSUMMARY = 'sales/SET_SALESSUMMARY';

// edit 버튼틀릭시 모드 변경 VIEW -> EDIT
const CHANGE_MODE = 'sales/CHANGE_MODE';

// sales 날짜 검색 기능
const SET_STARTENDOFMONTH = 'sales/SET_STARTENDOFMONTH';

export const getSalesList = (startOfMonth, endOfMonth) => async (dispatch) => {
  dispatch({ type: GET_SALESLIST }); //요청 시작을 알림
  dispatch(startLoading(GET_SALESLIST)); //loading true
  try {
    const response = await api.getSalesFiltered(startOfMonth, endOfMonth);
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

export const getSalesParams =
  (startOfMonth, endOfMonth, params) => async (dispatch) => {
    dispatch({ type: GET_SALESPARAMS }); //요청 시작을 알림
    dispatch(startLoading(GET_SALESPARAMS)); //loading true
    try {
      const response = await api.getSalesParameter(
        startOfMonth,
        endOfMonth,
        params,
      );
      dispatch({
        type: GET_SALESPARAMS_SUCCESS,
        payload: response,
      }); // 요청성공
      dispatch(finishLoading(GET_SALESPARAMS)); // loading false
    } catch (error) {
      dispatch({
        type: GET_SALESPARAMS_FAILURE,
        payload: error,
        error: true,
      }); // 요청실패
      dispatch(startLoading(GET_SALESPARAMS)); // loading true
      throw error;
    }
  };

export const getSalesStatistics = () => async (dispatch) => {
  dispatch({ type: GET_SALESSTATISTICS }); //요청 시작을 알림
  dispatch(startLoading(GET_SALESSTATISTICS)); //loading true
  try {
    const response = await api.getSalesListByMonth('sales-performances');
    dispatch({
      type: GET_SALESSTATISTICS_SUCCESS,
      payload: response,
    }); // 요청성공
    dispatch(finishLoading(GET_SALESSTATISTICS)); // loading false
  } catch (error) {
    dispatch({
      type: GET_SALESSTATISTICS_FAILURE,
      payload: error,
      error: true,
    }); // 요청실패
    dispatch(startLoading(GET_SALESSTATISTICS)); // loading true
    throw error;
  }
};

export const getSalesId = (id) => async (dispatch) => {
  dispatch({ type: GET_SALESID }); //요청 시작을 알림
  dispatch(startLoading(GET_SALESID)); //loading true
  try {
    const response = await api.getSalesId(id);
    dispatch({
      type: GET_SALESID_SUCCESS,
      payload: response,
    }); // 요청성공
    dispatch(finishLoading(GET_SALESID)); // loading false
  } catch (error) {
    dispatch({
      type: GET_SALESID_FAILURE,
      payload: error,
      error: true,
    }); // 요청실패
    dispatch(startLoading(GET_SALESID)); // loading true
    throw error;
  }
};

export const setSummary = createAction(
  SET_SALESSUMMARY,
  (summaryData) => summaryData,
);

// VIEW - EDIT 모드 변경
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

export const setStartEndOfMonth = createAction(
  SET_STARTENDOFMONTH,
  (month) => month,
);

const initialState = {
  data: '',
  detail: '',
  mode: 'VIEW',
  summary: '',
  month: [moment().format('YYYY-MM'), moment().format('YYYY-MM')],
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
    // 영업현황 리스트 가져오기 성공(월 & 확률)
    [GET_SALESPARAMS_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: payload.data,
    }),
    // 엽업현황 리스트 가져오기 실패(월 & 확률)
    [GET_SALESPARAMS_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 영업Summary Data
    [SET_SALESSUMMARY]: (state, { payload }) => ({
      ...state,
      summary: payload,
    }),
    // 영업현황 ID 가져오기 성공
    [GET_SALESID_SUCCESS]: (state, { payload }) => ({
      ...state,
      detail: payload.data,
    }),
    // 엽업현황 Id 가져오기 실패
    [GET_SALESID_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 모드변경(VIEW - EDIT)
    [CHANGE_MODE]: (state, { payload }) => ({
      ...state,
      mode: payload.mode,
    }),
    //start month & end month
    [SET_STARTENDOFMONTH]: (state, { payload }) => ({
      ...state,
      month: payload,
    }),
  },
  initialState,
);

export default sales;
