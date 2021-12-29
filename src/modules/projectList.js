import { createAction, handleActions } from "redux-actions";
import { apiProjects } from "../lib/api/api";

const GET_PROJECTLIST = 'project/GET_PROJECTLIST';
const GET_PROJECTLIST_SUCCESS = 'project/GET_PROJECTLIST_SUCCESS';
const GET_PROJECTLIST_FAILURE = 'project/GET_PROJECTLIST_FAILURE';

export const getProjectList = () => async dispatch => {
    dispatch({ type: GET_PROJECTLIST });
    try {
        const response = await apiProjects();
        dispatch({
            type: GET_PROJECTLIST_SUCCESS,
            payload: response,
        });
    } catch (error) {
        dispatch({
            type: GET_PROJECTLIST_FAILURE,
            payload: error,
            error: true,
        })
        throw error;
    }
}

const initialState = {
    data: '',
    status: null,
    error: null,
}

const projectlist = handleActions(
    {
        // 프로젝트 리스트 가져오기 성공
        [GET_PROJECTLIST_SUCCESS]: (state, { payload }) => ({
            ...state,
            data: payload.data,
            status: payload.status,
        }),
        // 프로젝트 리스트 가져오기 실패
        [GET_PROJECTLIST_FAILURE]: (state, { payload }) => ({
            ...state,
            error: payload,
        }),
    },
    initialState
)

export default projectlist;