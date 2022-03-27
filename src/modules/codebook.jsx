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

// export const getSalesCodebook = createRequestThunk(
//   GET_SCODEBOOK,
//   api.salesCodebook,
// );

export const getSalesCodebook = () => async (dispatch) => {
  dispatch({ type: GET_SCODEBOOK });
  console.log('getcodebook 실행');
  try {
    const response = await api.salesCodebook();
    console.log('response-salescodebook', response);
    dispatch({
      type: GET_SCODEBOOK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_SCODEBOOK_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

export const initialState = {
  code_types: null,
  code_services: null,
  code_statuses: null,
  code_tasks: null,
  sales: {
    probability: null,
    division: null,
    item: null,
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
        probability: payload[0].data.data.map((v) => {
          return { id: v.id, name: v.attributes.name, sort: v.attributes.sort };
        }),
        division: payload[1].data.data.map((v) => {
          return {
            id: v.id,
            name: v.attributes.name,
            sort: v.attributes.sort,
          };
        }),
        item: payload[2].data.data.map((v) => {
          return {
            id: v.id,
            division: v.attributes.scode_division.data.id,
            name: v.attributes.name,
            sort: v.attributes.sort,
          };
        }),
        team: payload[3].data.data.map((v) => {
          return { id: v.id, name: v.attributes.name, sort: v.attributes.sort };
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
