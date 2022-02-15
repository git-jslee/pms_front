import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import moment from 'moment';

// edit 버튼틀릭시 모드 변경 VIEW -> EDIT
const CHANGE_MODE = 'common/CHANGE_MODE';

// 월별 조회 관련 날짜 지정 기능
const SET_STARTENDOFMONTH = 'common/SET_STARTENDOFMONTH';

// 매출현황 테이블 확률&월별 조회 기능
const SET_PARAMS = 'common/SET_PARAMS';

// VIEW - EDIT 모드 변경
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

export const setStartEndOfMonth = createAction(
  SET_STARTENDOFMONTH,
  (month) => month,
);

export const setParams = createAction(SET_PARAMS, (params) => params);

const initialState = {
  mode: 'VIEW',
  month: [null, null],
  params: null,
  error: null,
};

const common = handleActions(
  {
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
    [SET_PARAMS]: (state, { payload }) => ({
      ...state,
      params: payload,
    }),
  },
  initialState,
);

export default common;
