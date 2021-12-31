import { createAction, handleActions } from 'redux-actions';
import { apiCodebook } from '../lib/api/api';

const GET_CODEBOOK = 'codebook/GET_CODEBOOK';
const CODEBOOK_SUCCESS = 'codebook/CODEBOOK_SUCCESS';
const CODEBOOK_FAILURE = 'codebook/CODEBOOK_FAILURE';

export const getCodebook = () => async (dispatch) => {
  dispatch({ type: GET_CODEBOOK });
  try {
    const response = await apiCodebook();
    dispatch({
      type: CODEBOOK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: CODEBOOK_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

const initialState = {
  code_types: null,
  code_services: null,
  code_statuses: null,
  code_tasks: null,
  status: null,
  error: null,
};

const codebook = handleActions(
  {
    // 코드북 조회 성공
    [CODEBOOK_SUCCESS]: (state, { payload }) => ({
      ...state,
      code_types: payload[0].data,
      code_services: payload[1].data,
      code_statuses: payload[2].data,
      code_tasks: payload[3].data,
    }),
    // 코드북 조회 실패
    [CODEBOOK_FAILURE]: (state, { payload, error }) => ({
      ...state,
      errMsg: payload,
      error: error,
    }),
  },
  initialState,
);

export default codebook;
