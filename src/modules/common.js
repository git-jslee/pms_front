import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import moment from 'moment';

// edit 버튼틀릭시 모드 변경 VIEW -> EDIT
const CHANGE_MODE = 'common/CHANGE_MODE';

// edit 버튼틀릭시 모드 변경 editmode false-> true
const CHANGE_EDITMODE = 'common/CHANGE_EDITMODE';

// 월별 조회 관련 날짜 지정 기능
const SET_STARTENDOFMONTH = 'common/SET_STARTENDOFMONTH';

// 매출현황 테이블 확률&월별 조회 기능
const SET_PARAMS = 'common/SET_PARAMS';

// 상세 검색 테이블
const SET_SEARCHTABLE = 'common/SET_SEARCHTABLE';

const SET_CUSTOMERID = 'common/SET_CUSTOMERID';

// VIEW - EDIT 모드 변경
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

// VIEW - EDIT 모드 변경
export const changeEditMode = createAction(
  CHANGE_EDITMODE,
  (editmode) => editmode,
);

// Autocomplete 기능 이용하여 고객 검색시 고객Id 등록
export const setCustomerId = createAction(SET_CUSTOMERID, (id) => id);

export const setStartEndOfMonth = createAction(
  SET_STARTENDOFMONTH,
  (month) => month,
);

export const setParams = createAction(SET_PARAMS, (params) => params);

// 서브메뉴 상세검색 클릭시
export const setSearchTable = createAction(SET_SEARCHTABLE, (mode) => mode);

const initialState = {
  editmode: false,
  search: false,
  customerid: { id: null, name: null },
  month: [null, null],
  params: null,
  error: null,
  mode: 'VIEW',
};

const common = handleActions(
  {
    // 모드변경(VIEW - EDIT)
    [CHANGE_MODE]: (state, { payload }) => ({
      ...state,
      mode: payload.mode,
    }),
    // 모드변경(VIEW - EDIT)
    [CHANGE_EDITMODE]: (state, { payload }) => ({
      ...state,
      editmode: payload.editmode,
    }),
    // 상세 조회 테이블
    [SET_SEARCHTABLE]: (state, { payload }) => ({
      ...state,
      search: !state.search,
    }),
    [SET_CUSTOMERID]: (state, { payload }) => ({
      ...state,
      customerid: payload,
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
