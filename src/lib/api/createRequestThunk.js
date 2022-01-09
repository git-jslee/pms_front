// 220109 - 아직 적용 안함..
import { startLoading, finishLoading } from '../../modules/loading';

export default function createRequestThunk(type, request) {
  // 성공 및 실패 액션 타입 정의
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type }); //시작됨
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); //성공
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); //에러발생
      dispatch(startLoading(type));
      throw e;
    }
  };
}
