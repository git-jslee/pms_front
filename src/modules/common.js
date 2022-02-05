import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import moment from 'moment';

// edit 버튼틀릭시 모드 변경 VIEW -> EDIT
const CHANGE_MODE = 'common/CHANGE_MODE';

// VIEW - EDIT 모드 변경
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

const initialState = {
  mode: 'VIEW',
  error: null,
};

const common = handleActions(
  {
    // 모드변경(VIEW - EDIT)
    [CHANGE_MODE]: (state, { payload }) => ({
      ...state,
      mode: payload.mode,
    }),
  },
  initialState,
);

export default common;
