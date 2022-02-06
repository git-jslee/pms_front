import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import moment from 'moment';

// edit 버튼틀릭시 모드 변경 VIEW -> EDIT
const CHANGE_MODE = 'common/CHANGE_MODE';

// 월별 조회 관련 날짜 지정 기능
const SET_STARTENDOFMONTH = 'common/SET_STARTENDOFMONTH';

// VIEW - EDIT 모드 변경
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

export const setStartEndOfMonth = createAction(
  SET_STARTENDOFMONTH,
  (month) => month,
);

const initialState = {
  mode: 'VIEW',
  month: [null, null],
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
  },
  initialState,
);

export default common;
