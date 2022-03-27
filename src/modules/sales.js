import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import moment from 'moment';
import calStartEndDayFromMonth from './common/calStartEndDayFromMonth';

// 매출현황 리스트
const GET_SALESLIST = 'sales/GET_SALESLIST';
const GET_SALESLIST_SUCCESS = 'sales/GET_SALESLIST_SUCCESS';
const GET_SALESLIST_FAILURE = 'sales/GET_SALESLIST_FAILURE';

// 매출현황 리스트 월&확률 조회
const GET_SALESPARAMS = 'sales/GET_SALESPARAMS';
const GET_SALESPARAMS_SUCCESS = 'sales/GET_SALESPARAMS_SUCCESS';
const GET_SALESPARAMS_FAILURE = 'sales/GET_SALESPARAMS_FAILURE';

// 매출현황 리스트 월&확률 조회
const GET_SALESQUERY = 'sales/GET_SALESQUERY';
const GET_SALESQUERY_SUCCESS = 'sales/GET_SALESQUERY_SUCCESS';
const GET_SALESQUERY_FAILURE = 'sales/GET_SALESQUERY_FAILURE';

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

// components/sales/SalesSubMenu 76,90
// sales/SalesSubContainer 85, 150, 184
export const getSalesList = (query) => async (dispatch) => {
  dispatch({ type: GET_SALESLIST }); //요청 시작을 알림
  dispatch(startLoading(GET_SALESLIST)); //loading true
  // 월 시작날짜, 마지막 날짜 구하기
  // let queryString;
  // const _start = moment(start).format('YYYY-MM');
  // const _end = moment(end).format('YYYY-MM');
  // const startEnd = calStartEndDayFromMonth(_start, _end);
  // const queayDefault = `sales_rec_date_gte=${startEnd[0]}&sales_rec_date_lte=${startEnd[1]}&deleted=false`;

  // if (!arg) {
  //   queryString = queayDefault;
  // } else {
  //   queryString = queayDefault + arg;
  // }

  // console.log('**getSalesList- queryString**', query);
  try {
    const response = await api.getSalesQueryString(query);
    dispatch({
      type: GET_SALESLIST_SUCCESS,
      payload: response.data,
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

// 세일즈 현황테이블에서...사용중..
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

// 전체 쿼리문을 인자로 받게 개선.중..
// /sales/SalesStatisticsContainer.jsx 85:13-26
export const getSalesQuery = (query) => async (dispatch) => {
  dispatch({ type: GET_SALESQUERY }); //요청 시작을 알림
  dispatch(startLoading(GET_SALESQUERY)); //loading true
  try {
    const response = await api.getSalesQueryString(query);
    dispatch({
      type: GET_SALESQUERY_SUCCESS,
      payload: response,
    }); // 요청성공
    dispatch(finishLoading(GET_SALESQUERY)); // loading false
  } catch (error) {
    dispatch({
      type: GET_SALESQUERY_FAILURE,
      payload: error,
      error: true,
    }); // 요청실패
    dispatch(startLoading(GET_SALESQUERY)); // loading true
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

export const getSalesId = (query) => async (dispatch) => {
  dispatch({ type: GET_SALESID }); //요청 시작을 알림
  dispatch(startLoading(GET_SALESID)); //loading true
  try {
    // const response = await api.getSalesId(id);
    const response = await api.getQueryString('api/sales-statuses', query);
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
    // 영업현황 리스트 가져오기 성공
    [GET_SALESQUERY_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: payload.data,
    }),
    // 엽업현황 리스트 가져오기 실패
    [GET_SALESQUERY_FAILURE]: (state, { payload }) => ({
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
      detail: payload.data.data[0],
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
