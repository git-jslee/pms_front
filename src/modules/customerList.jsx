import { handleActions } from 'redux-actions';
import { apiCustomerList } from '../lib/api/api';

const GET_CUSTOMERLIST = 'customer_lists/GET_CUSTOMERLIST';
const GET_CUSTOMERLIST_SUCCESS = 'customer_lists/GET_CUSTOMERLIST_SUCCESS';
const GET_CUSTOMERLIST_FAILURE = 'customer_lists/GET_CUSTOMERLIST_FAILURE';

export const getCustomerlist = () => async (dispatch) => {
  dispatch({ type: GET_CUSTOMERLIST });
  try {
    const response = await apiCustomerList();
    console.log('---response---', response);
    // 오름차순 정렬
    const sortResponse = response.data.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    console.log('---sort---', sortResponse);
    dispatch({
      type: GET_CUSTOMERLIST_SUCCESS,
      payload: sortResponse,
      status: true,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMERLIST_FAILURE,
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

const customerList = handleActions(
  {
    // 고객리스트 가져오기 성공
    [GET_CUSTOMERLIST_SUCCESS]: (state, { payload, status }) => ({
      ...state,
      data: payload,
      status: status,
    }),
    // 고객리스트 가져오기 실패
    [GET_CUSTOMERLIST_FAILURE]: (state, { payload }) => ({
      ...state,
      data: payload,
      status: false,
      error: true,
    }),
  },
  initialState,
);

export default customerList;
