import { createAction, handleActions } from 'redux-actions';

const SELECTED_SERVICE = 'addProject/SELECTED_SERVICE';

// 프로젝트 추가 페이지에서 서비스 선택시

export const selectedService = createAction(
  SELECTED_SERVICE,
  (serviceId) => serviceId,
);

const initialState = {
  serviceId: null,
};

const addProject = handleActions(
  {
    [SELECTED_SERVICE]: (state, action) => ({
      ...state,
      serviceId: action.payload.serviceId,
    }),
  },
  initialState,
);

export default addProject;
