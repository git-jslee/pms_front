import { createAction, handleActions } from 'redux-actions';
import { apiCodebook } from '../lib/api/api';
import * as api from '../lib/api/api';
import createRequestThunk from '../lib/api/createRequestThunk';

const GET_CODEBOOK = 'codebook/GET_CODEBOOK';
const CODEBOOK_SUCCESS = 'codebook/CODEBOOK_SUCCESS';
const CODEBOOK_FAILURE = 'codebook/CODEBOOK_FAILURE';

const GET_SCODEBOOK = 'codebook/GET_SCODEBOOK';
const GET_SCODEBOOK_SUCCESS = 'codebook/GET_SCODEBOOK_SUCCESS';
const GET_SCODEBOOK_FAILURE = 'codebook/GET_SCODEBOOK_FAILURE';

export const getCodebook = () => async (dispatch) => {
  dispatch({ type: GET_CODEBOOK });
  console.log('getcodebook 실행');
  try {
    const response = await apiCodebook();
    console.log('response', response);
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

export const getSalesCodebook = createRequestThunk(
  GET_SCODEBOOK,
  api.salesCodebook,
);

export const initialState = {
  code_types: null,
  code_services: null,
  code_statuses: null,
  code_tasks: null,
  sales: {
    probability: null,
    division: null,
    team: null,
  },
  status: null,
  errMsg: null,
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
      status: true,
    }),
    // 코드북 조회 실패
    [CODEBOOK_FAILURE]: (state, { payload, error }) => ({
      ...state,
      errMsg: payload,
      error: error,
    }),
    // sales 코드북 조회 성공
    [GET_SCODEBOOK_SUCCESS]: (state, { payload }) => ({
      ...state,
      sales: {
        probability: payload[0].data.map((v) => {
          return { id: v.id, name: v.name, sort: v.sort };
        }),
        division: payload[1].data.map((v) => {
          const itemlist = payload[2].data
            .filter((item) => item.scode_division.id === v.id)
            .map((v2) => {
              return {
                id: v2.id,
                name: v2.name,
                sort: v2.sort,
              };
            });
          return { id: v.id, name: v.name, sort: v.sort, item: itemlist };
        }),
        team: payload[3].data.map((v) => {
          return { id: v.id, name: v.name, sort: v.sort };
        }),
      },
      status: true,
    }),
    [GET_SCODEBOOK_FAILURE]: (state, { payload, error }) => ({
      ...state,
      errMsg: payload,
      error: error,
    }),
  },
  initialState,
);

export default codebook;
