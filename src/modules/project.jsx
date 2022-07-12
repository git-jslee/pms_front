// projectList, projectForm module 통합작업
import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api/api';
import { startLoading, finishLoading } from './loading';
import createRequestThunk from '../lib/api/createRequestThunk';

// 프로젝트 리스트
const GET_PROJECT = 'project/GET_PROJECT';
const GET_PROJECT_SUCCESS = 'project/GET_PROJECT_SUCCESS';
const GET_PROJECT_FAILURE = 'project/GET_PROJECT_FAILURE';

const GET_WORK = 'project/GET_WORK';
const GET_WORK_SUCCESS = 'project/GET_WORK_SUCCESS';
const GET_WORK_FAILURE = 'project/GET_WORK_FAILURE';

const GET_PWORKLIST = 'project/GET_PWORKLIST';
const GET_PWORKLIST_SUCCESS = 'project/GET_PWORKLIST_SUCCESS';
const GET_PWORKLIST_FAILURE = 'project/GET_PWORKLIST_FAILURE';

// 프로젝트 리스트
const GET_PROJECTLIST = 'project/GET_PROJECTLIST';
const GET_PROJECTLIST_SUCCESS = 'project/GET_PROJECTLIST_SUCCESS';
const GET_PROJECTLIST_FAILURE = 'project/GET_PROJECTLIST_FAILURE';

const CHANGE_PROJECTSTATUS = 'project/CHANGE_PROJECTSTATUS';
const CHANGE_PROJECTPROGRESS = 'project/CHANGE_PROJECTPROGRESS';

const INIT_PROJECTSTORAGE = 'project/INIT_PROJECTSTORAGE';

// 프로젝트 ID
const GET_PROJECTID = 'project/GET_PROJECTID';
const GET_PROJECTID_SUCCESS = 'project/GET_PROJECTID_SUCCESS';
const GET_PROJECTID_FAILURE = 'project/GET_PROJECTID_FAILURE';

// 프로젝트 ID 별 tasks & works
const GET_PROJECTWORK = 'project/GET_PROJECTWORK';
const GET_PROJECTWORK_SUCCESS = 'project/GET_PROJECTWORK_SUCCESS';
const GET_PROJECTWORK_FAILURE = 'project/GET_PROJECTWORK_FAILURE';

// 프로젝트 정보 가져오기 통합

export const getProject = (query) => async (dispatch) => {
  dispatch({ type: GET_PROJECT }); //요청 시작을 알림
  dispatch(startLoading(GET_PROJECT)); //loading true
  try {
    const response = await api.getQueryString('api/projects', query);
    // const response = await api.getList(params);
    console.log('response', response);

    // <--변경 2022.07.09
    // 프로젝트 > 리스트
    const lists = response.data.data.map((list) => {
      // 프로젝트 진행률 계산
      const tasks = list.attributes.project_tasks.data;
      console.log('tasks', tasks);
      let total_weight = 0;
      let total_plan = 0;
      let total_work = 0;
      const task_progress = tasks.map((task) => {
        let weight = 0;
        const progress = task.attributes.code_progress.data
          ? parseFloat(
              task.attributes.code_progress.data.attributes.code * 0.01,
            )
          : 0;
        // task 계획시간, total 작업 시간중 ..큰 값 리턴..
        const plan_day = task.attributes.manpower * task.attributes.plan_day;
        const total_day = task.attributes.total_time
          ? (task.attributes.total_time / 8) * (1 / progress)
          : 0;
        if (plan_day === 0 && total_day === 0) {
          weight = 1.1;
        } else {
          weight =
            plan_day >= total_day
              ? Math.round(plan_day * 100) / 100
              : Math.round(total_day * 100) / 100;
        }
        total_weight += weight;
        total_plan += plan_day;
        total_work += total_day;
        const returndata = { progress, weight, plan_day, total_day };
        return returndata;
      });
      console.log('task_progress', task_progress);
      console.log('total_weight', Math.round(total_weight * 10) / 10);
      // 가중치 weight 계산
      let _progress = 0;
      const project_progress = task_progress.map((v) => {
        if (v.progress > 0) {
          _progress += v.progress * (v.weight / total_weight);
        }
      });
      return {
        ...list,
        project_progress: Math.round(_progress * 100) / 100,
        total_plan,
        total_work,
      };
    });
    console.log('lists', lists);
    // 변경 -->

    // <--기존방식
    dispatch({
      type: GET_PROJECT_SUCCESS,
      // payload: response.data.data,
      payload: lists,
    }); // 요청 성공
    // 기존방식 -->

    dispatch(finishLoading(GET_PROJECT)); //loading false
  } catch (error) {
    console.log('error-getproject', error);
    dispatch({
      typd: GET_PROJECT_FAILURE,
      payload: error,
      error: true,
    }); //요청 실패
    dispatch(startLoading(GET_PROJECT)); // loading true
    throw error;
  }
};

// 기간별 작업 정보 가져오기
export const getWork = (query) => async (dispatch) => {
  dispatch({ type: GET_WORK });
  dispatch(startLoading(GET_WORK));
  try {
    const response = await api.getQueryString('api/works', query);
    console.log('**getWorkList**', response.data.data);
    dispatch({
      type: GET_WORK_SUCCESS,
      payload: response.data.data,
    });
    dispatch(finishLoading(GET_WORK));
  } catch (error) {
    dispatch({
      typd: GET_WORK_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_WORK));
    throw error;
  }
};

// 기간별 작업 정보 가져오기
// http://192.168.20.99:1337/works?workingDay_gte=2022-02-25&workingDay_lte=${end}`)
export const getProjectWorkList = (params) => async (dispatch) => {
  dispatch({ type: GET_PWORKLIST });
  dispatch(startLoading(GET_PWORKLIST));
  try {
    const response = await api.getList(params);
    console.log('getProjectWorkList', response.data);
    dispatch({
      type: GET_PWORKLIST_SUCCESS,
      payload: response.data,
    });
    dispatch(finishLoading(GET_PWORKLIST));
  } catch (error) {
    dispatch({
      typd: GET_PWORKLIST_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_PWORKLIST));
    throw error;
  }
};

// 20220709, project count container..
// status 값 확인 추가..
export const getProjectList = (query, sid) => async (dispatch) => {
  dispatch({ type: GET_PROJECTLIST }); //요청 시작을 알림
  dispatch(startLoading(GET_PROJECTLIST)); //loading true
  try {
    const response = await api.getQueryString('api/projects', query);
    // const response = await api.getList(params);
    console.log('response', response);
    let payload_data;

    // 프로젝트 > 리스트 > 상태 : 진행중
    if (sid === 2) {
      const lists = response.data.data.map((list) => {
        // 프로젝트 진행률 계산
        const tasks = list.attributes.project_tasks.data;
        // console.log('tasks', tasks);
        let total_weight = 0;
        let total_plan = 0;
        let total_work = 0;
        const task_progress = tasks.map((task) => {
          let weight = 0;
          const progress = task.attributes.code_progress.data
            ? parseFloat(
                task.attributes.code_progress.data.attributes.code * 0.01,
              )
            : 0;
          // task 계획시간, total 작업 시간중 ..큰 값 리턴..
          const plan_day = task.attributes.manpower * task.attributes.plan_day;
          const task_totaltime = task.attributes.total_time;
          const estimatedTotalday = task_totaltime
            ? (task_totaltime / 8) * (1 / progress)
            : 0;

          if (plan_day === 0 && estimatedTotalday === 0) {
            weight = 1.1;
          } else {
            weight =
              plan_day >= estimatedTotalday
                ? Math.round(plan_day * 100) / 100
                : Math.round(estimatedTotalday * 100) / 100;
          }
          total_weight += weight;
          total_plan += plan_day;
          total_work += task_totaltime / 8;
          const returndata = {
            progress,
            weight,
            // plan_day,
            // total_work: Math.round(total_work * 10) / 10,
          };
          return returndata;
        });
        console.log('task_progress', task_progress);
        // console.log('total_weight', Math.round(total_weight * 10) / 10);
        // 가중치 weight 계산
        let _progress = 0;
        const project_progress = task_progress.map((v) => {
          if (v.progress > 0) {
            _progress += v.progress * (v.weight / total_weight);
          }
        });
        const progressRate = () => {
          let returnRate = 0;
          if (_progress <= 0.15) {
            returnRate = 10;
          } else if (_progress <= 0.4) {
            returnRate = 25;
          } else if (_progress <= 0.65) {
            returnRate = 50;
          } else if (_progress <= 0.8) {
            returnRate = 75;
          } else if (_progress <= 1) {
            returnRate = 90;
          }
          return returnRate;
        };
        return {
          ...list,
          project_progress: Math.round(_progress * 100),
          progressRate: progressRate(),
          total_plan,
          total_work: Math.round(total_work * 10) / 10,
        };
      });
      console.log('lists', lists);
      payload_data = lists;
    } else {
      payload_data = response.data.data;
    }

    dispatch({
      type: GET_PROJECTLIST_SUCCESS,
      state_id: sid,
      payload: payload_data,
    }); // 요청 성공
    //
    dispatch(finishLoading(GET_PROJECTLIST)); //loading false
  } catch (error) {
    console.log('error-getproject', error);
    dispatch({
      typd: GET_PROJECTLIST_FAILURE,
      payload: error,
      error: true,
    }); //요청 실패
    dispatch(startLoading(GET_PROJECTLIST)); // loading true
    throw error;
  }
};

//
export const changeProjectStatus = (stateid) => (dispatch) => {
  dispatch({ type: CHANGE_PROJECTSTATUS, payload: stateid }); // status 변경
};

// 진행중 프로젝트 10~90% 해당 버튼 클릭시
export const changeProjectProgress = (progress) => (dispatch) => {
  dispatch({ type: CHANGE_PROJECTPROGRESS, payload: progress });
};

// 프로젝트 storage 초기화
export const initProjectStorage = () => (dispatch) => {
  dispatch({ type: INIT_PROJECTSTORAGE });
};

// export const getProjectList = createRequestThunk(GET_PROJECTLIST, api.getList);
// console.log('getProjectList', getProjectList());

export const getProjectId = (id) => async (dispatch) => {
  dispatch({ type: GET_PROJECTID }); // 요청 시작을 알림
  dispatch(startLoading(GET_PROJECTID));
  try {
    const response = await api.getListPathId('api/projects', id);
    dispatch({
      type: GET_PROJECTID_SUCCESS,
      payload: response.data.data,
    });
    dispatch(finishLoading(GET_PROJECTID));
  } catch (error) {
    dispatch({
      type: GET_PROJECTID_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_PROJECTID));
    throw error;
  }
};

export const getProjectWork = (query) => async (dispatch) => {
  dispatch({ type: GET_PROJECTWORK }); // 요청 시작을 알림
  dispatch(startLoading(GET_PROJECTWORK));
  try {
    // 수정 필요
    const res_task = await api.getQueryString('api/project-tasks', query[0]);
    const res_work = await api.getQueryString('api/works', query[1]);
    dispatch({
      type: GET_PROJECTWORK_SUCCESS,
      payload1: res_task.data.data,
      payload2: res_work.data.data,
    });
    dispatch(finishLoading(GET_PROJECTWORK));
  } catch (error) {
    dispatch({
      type: GET_PROJECTWORK_FAILURE,
      payload: error,
      error: true,
    });
    dispatch(startLoading(GET_PROJECTWORK));
    throw error;
  }
};

const initialState = {
  data: null,
  getdata: null,
  status: { id: null, progress: null },
  error: null,
  werror: null,
};

const project = handleActions(
  {
    // 프로젝트 리스트 가져오기 성공
    [GET_PROJECT_SUCCESS]: (state, { payload }) => ({
      ...state,
      list: payload,
    }),
    // 프로젝트 리스트 가져오기 실패
    [GET_PROJECT_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 작업 리스트 가져오기 성공
    [GET_WORK_SUCCESS]: (state, { payload }) => ({
      ...state,
      wlist: payload,
    }),
    // 작업 리스트 가져오기 실패
    [GET_WORK_FAILURE]: (state, { payload }) => ({
      ...state,
      werror: true,
    }),
    // 작업 리스트 가져오기 성공
    [GET_PWORKLIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      wlist: payload,
    }),
    // 작업 리스트 가져오기 실패
    [GET_PWORKLIST_FAILURE]: (state, { payload }) => ({
      ...state,
      werror: true,
    }),
    // 프로젝트 리스트 가져오기 성공
    [GET_PROJECTLIST_SUCCESS]: (state, { payload, state_id }) => ({
      ...state,
      status: { id: state_id, progress: null },
      data: { ...state.data, [state_id]: payload },
      getdata: { ...state.getdata, [state_id]: 'OK' },
    }),
    // 프로젝트 리스트 가져오기 실패
    [GET_PROJECTLIST_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 프로젝트 status 변경
    [CHANGE_PROJECTSTATUS]: (state, { payload }) => ({
      ...state,
      status: { id: payload, progress: null },
    }),
    // 프로젝트 모드 변경
    [CHANGE_PROJECTPROGRESS]: (state, { payload }) => ({
      ...state,
      status: { id: 2, progress: payload }, // status 진행중으로 변경
    }),
    // 프로젝트 초기화
    [INIT_PROJECTSTORAGE]: (state) => ({
      ...initialState, // status 진행중으로 변경
    }),
    // 프로젝트 ID 가져오기 성공
    [GET_PROJECTID_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        projectInfo: payload,
      },
      error: false,
    }),
    // 프로젝트 ID 가져오기 실패
    [GET_PROJECTID_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
    // 프로젝트 tasks & work 정보
    [GET_PROJECTWORK_SUCCESS]: (state, { payload1, payload2 }) => ({
      ...state,
      data: {
        ...state.data,
        tasks: payload1,
        works: payload2,
      },
      error: false,
    }),
    // 프로젝트 tasks & work 실패
    [GET_PROJECTWORK_FAILURE]: (state, { payload }) => ({
      ...state,
      error: true,
    }),
  },
  initialState,
);

export default project;
