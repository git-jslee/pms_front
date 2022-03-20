import { handleActions } from 'redux-actions';
import { apiCustomerList } from '../lib/api/api';
import * as api from '../lib/api/api';

const GET_CUSTOMER = 'customer/GET_CUSTOMER';
const GET_CUSTOMER_SUCCESS = 'customer/GET_CUSTOMER_SUCCESS';
const GET_CUSTOMER_FAILURE = 'customer/GET_CUSTOMER_FAILURE';

export const getCustomerlist = () => async (dispatch) => {
  dispatch({ type: GET_CUSTOMER });
  try {
    const response = await apiCustomerList();
    const clist = response.data.data;
    console.log('---response---', clist);
    // 오름차순 정렬
    const sortResponse = response.data.data.sort((a, b) => {
      return a.attributes.name < b.attributes.name
        ? -1
        : a.attributes.name > b.attributes.name
        ? 1
        : 0;
    });
    console.log('---sort---', sortResponse);
    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: sortResponse,
      status: true,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_FAILURE,
      payload: error,
    });
    throw error;
  }
};

const initialState = {
  data: '',
  status: null,
  error: null,
};

const customer = handleActions(
  {
    // 고객리스트 가져오기 성공
    [GET_CUSTOMER_SUCCESS]: (state, { payload, status }) => ({
      ...state,
      data: payload,
      status: status,
    }),
    // 고객리스트 가져오기 실패
    [GET_CUSTOMER_FAILURE]: (state, { payload }) => ({
      ...state,
      data: payload,
      status: false,
      error: true,
    }),
  },
  initialState,
);

export default customer;
