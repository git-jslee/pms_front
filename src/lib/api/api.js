import axios from 'axios';
import { API_URL } from '../../config/constants';

// https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters

// 로그인
export const loginUser = (username, password) =>
  axios.post(`${API_URL}/auth/local`, {
    identifier: username,
    password: password,
  });

// 회원가입
export const register = ({ username, password }) =>
  axios.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => axios.get('/api/auth/check');

// 로그아웃

// 코드북
export const apiCodebook = () =>
  axios.all([
    axios.get(`${API_URL}/code-types`),
    // axios.get(`${API_URL}/customers`),
    axios.get(`${API_URL}/code-services`),
    axios.get(`${API_URL}/code-statuses`),
    axios.get(`${API_URL}/code-tasks`),
  ]);

// sales 코드북
export const salesCodebook = () =>
  axios.all([
    axios.get(`${API_URL}/scode-probabilities`),
    axios.get(`${API_URL}/scode-divisions`),
    axios.get(`${API_URL}/scode-items`),
    axios.get(`${API_URL}/scode-teams`),
  ]);

// 코드 진행상태 - code-progresses
export const apiCodeProgress = () => axios.get(`${API_URL}/code-progresses`);

// == getList(날짜별 조회 기능 추가 필요)
export const getList = (path) => axios.get(`${API_URL}/${path}`);

// == getSalesList(날짜별 조회 기능 추가 필요)
// projects?planStartDate_gte=2021-11-01&planStartDate_lte=2021-12-01
export const getSalesListByMonth = (start, end) =>
  axios.get(
    `${API_URL}/sales-performance?sales_rec_date_gte=${start}&sales_rec_date_lte=${end}`,
  );

//getSalesId
export const getSalesId = (id) =>
  axios.get(`${API_URL}/sales-performances/${id}`);

// === getPathId
export const getListPathId = (path, id) =>
  axios.get(`${API_URL}/${path}/${id}`);

// == getProjectWork==?? 이름 변경
export const getProjectWork = (path, id) =>
  axios.get(`${API_URL}/${path}?project.id=${id}`);

// insert
export const insertData = (path, auth_data) =>
  axios.post(`${API_URL}/${path}`, ...auth_data);

// update //put/sales-performances/:id
export const updateData = (path, id, auth_data) =>
  axios.put(`${API_URL}/${path}/${id}`, ...auth_data);

// 프로젝트 리스트
export const apiProjectList = () => axios.get(`${API_URL}/projects`);

// 프로젝트 리스트 기간별 조회
// projects?planStartDate_gte=2021-11-01&planStartDate_lte=2021-12-01
export const getProjectFiltered = (start, end) =>
  axios.get(
    `${API_URL}/projects?planStartDate_gte=${start}&planStartDate_lte=${end}`,
  );

// sales 리스트 기간별 조회
// projects?planStartDate_gte=2021-11-01&planStartDate_lte=2021-12-01
export const getSalesFiltered = (start, end) =>
  axios.get(
    `${API_URL}/sales-performances?sales_rec_date_gte=${start}&sales_rec_date_lte=${end}`,
  );

// 프로젝트 View
export const apiProject = (id) => axios.get(`${API_URL}/projects/${id}`);

// 프로젝트 Task
export const apiProjectTaskId = (id) =>
  axios.get(`${API_URL}/project-tasks?project.id=${id}`);

// 프로젝트 등록
export const apiAddProject = (datas, values, tasks) =>
  axios
    .post(`${API_URL}/projects`, ...datas)
    .then((result) => {
      console.log('>>프로젝트 등록 성공');
      tasks.map((task) => {
        axios.post(`${API_URL}/project-tasks`, {
          project: result.data.id,
          code_task: task.id,
          planTime: values[task.code],
        });
        console.log('>>task>>', task);
        console.log('>>planTime>>', values);
      });
    })
    .then(() => {
      console.log('Project Tasks 등록 성공');
    })
    .catch((error) => {
      console.error(`에러가 발생했습니다.  ${error.message}`);
    });

// 프로젝트 카운트
export const apiProjectCount = () =>
  axios.all([
    axios.get(`${API_URL}/projects/count?code_status.id=1`),
    axios.get(`${API_URL}/projects/count?code_status.id=2`),
    axios.get(`${API_URL}/projects/count?code_status.id=3`),
    axios.get(`${API_URL}/projects/count?code_status.id=4`),
  ]);

// 프로젝트 tasks 등록
export const apiAddProjectTasks = () => axios.post(`${API_URL}/project-tasks`);

// 고객사&진행중 프로젝트 리스트
export const apiCustomer_ProjectList = (id) =>
  axios.get(`${API_URL}/projects?customer.id=${id}&code_status.id=2`);

// 고객 정보 조회
export const apiCustomerList = () =>
  axios.get(`${API_URL}
/customers`);

// 고객 등록
export const apiAddCustomer = (data) =>
  axios.post(`${API_URL}/customers`, data);

// 작업 등록
export const apiAddWork = (datas) => axios.post(`${API_URL}/works`, ...datas);

// 작업 리스트
// /works?user_info.id=1
// 정렬...works?_sort=workingDay:DESC
export const apiWorkList = (id) =>
  // axios.get(`${API_URL}/works?user_info.id=${id}&_sort=workingDay:DESC`);
  axios.get(
    `${API_URL}/works?users_permissions_user.id=${id}&_sort=workingDay:DESC`,
  );

// 사용자별 작업 조회
// works?user_info.users_permissions_user=3

// 사용자 리스트
export const apiUserList = () => axios.get(`${API_URL}/users`);

// Project 별 work..
export const apiWorkId = (id) => axios.get(`${API_URL}/works?project.id=${id}`);
