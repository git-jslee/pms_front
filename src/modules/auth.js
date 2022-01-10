import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { loginUser } from '../lib/api/api';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_FROM_STORAGE = 'auth/LOGIN_FROM_STORAGE';

const LOGOUT = 'auth/LOGOUT';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, //register, login
    key, //username, password, passwordConfirm
    value, //실제로 바꾸려는 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); //register / login
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    dispatch({ type: LOGIN });
    try {
      const response = await loginUser(username, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
        error: true,
      }); //에러 발생
      throw error; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
    }
  };

export const loginFromStorage = createAction(LOGIN_FROM_STORAGE);

export const logout = createAction(LOGOUT);

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // 예: state.register.username 을 바꾼다.
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    // 새로고침시 세션스토리지 저장 정보 Storage 저장
    [LOGIN_FROM_STORAGE]: (state, { payload }) => ({
      ...state,
      auth: payload,
    }),
    //로그인 성공
    [LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      auth: payload.data,
      authError: null,
    }),
    //로그인 실패
    [LOGIN_FAILURE]: (state, { payload }) => ({
      ...state,
      authError: payload.message,
    }),
    //로그 아웃
    [LOGOUT]: (state) => ({
      ...state,
      auth: null,
    }),
  },
  initialState,
);

export default auth;
