import axios from 'axios';
import { API_URL } from '../../config/constants';

// https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
// ?filters[code][$eq] = w100
//   & pagination[start]=0 & pagination[limit]=10
//     & fields[0]=code & fields[1]=name
// ?populate=%2A -> 모두가져오기

// 로그인
export const loginUser = (username, password) =>
  axios.post(`${API_URL}/api/auth/local`, {
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
    axios.get(`${API_URL}/api/code-types`),
    // axios.get(`${API_URL}/customers`),
    axios.get(`${API_URL}/api/code-services`),
    axios.get(`${API_URL}/api/code-statuses`),
    axios.get(`${API_URL}/api/code-tasks?populate=%2A&pagination[pageSize]=50`),
  ]);

// strapi v4 --->
export const getQueryString = (path, query) =>
  axios.get(`${API_URL}/${path}?${query}`);

export const getCountProject = (path, query) =>
  axios.all([
    axios.get(`${API_URL}/${path}?${query[0]}`),
    axios.get(`${API_URL}/${path}?${query[1]}`),
    axios.get(`${API_URL}/${path}?${query[2]}`),
    axios.get(`${API_URL}/${path}?${query[3]}`),
    axios.get(`${API_URL}/${path}?${query[4]}`),
  ]);

// <-- strapi v4

// sales 코드북
export const salesCodebook = () =>
  axios.all([
    axios.get(`${API_URL}/api/scode-probabilities?populate=%2A`),
    axios.get(`${API_URL}/api/scode-divisions?populate=%2A`),
    axios.get(`${API_URL}/api/scode-items?populate=%2A`),
    axios.get(`${API_URL}/api/scode-teams?populate=%2A`),
  ]);

// 코드 진행상태 - code-progresses
export const apiCodeProgress = () => axios.get(`${API_URL}/code-progresses`);

// 가져오기 기능 통합
// projectlist,
export const getListfromPrams = (params) => axios.get(`${API_URL}/${params}`);

// == getList(날짜별 조회 기능 추가 필요)
export const getList = (path) => axios.get(`${API_URL}/${path}`);

export const getListQuery = (path, query) =>
  axios.get(`${API_URL}/${path}?${query}`);

// == getSalesList(날짜별 조회 기능 추가 필요)
// projects?planStartDate_gte=2021-11-01&planStartDate_lte=2021-12-01
export const getSalesListByMonth = (start, end) =>
  axios.get(
    `${API_URL}/sales-performance?sales_rec_date_gte=${start}&sales_rec_date_lte=${end}`,
  );

// == 프로젝트 월별 조회
export const getProjectListByMonth = (start, end) =>
  axios.get(`${API_URL}/projects?startDate_gte=${start}&startDate_lte=${end}`);

//getSalesId
export const getSalesId = (id) =>
  axios.get(`${API_URL}/api/sales-statuses/${id}?populate=%2A`);

// === getPathId
export const getListPathId = (path, id) =>
  axios.get(`${API_URL}/${path}/${id}?populate=%2A`);

// == getProjectWork==?? 이름 변경
export const getProjectWork = (path, id) =>
  axios.get(`${API_URL}/${path}?project.id=${id}`);

// insert
export const insertData = (path, auth_data) =>
  axios.post(`${API_URL}/${path}`, ...auth_data);

// create
export const createData = (path, auth_data) =>
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

// sales 리스트 기간별 & 확률별 조회
// projects?planStartDate_gte=2021-11-01&planStartDate_lte=2021-12-01
export const getSalesParameter = (start, end, params) =>
  axios.get(
    `${API_URL}/sales-performances?sales_rec_date_gte=${start}&sales_rec_date_lte=${end}${params}`,
  );

// sales 리스트 기간별 & 확률별 조회
// projects?planStartDate_gte=2021-11-01&planStartDate_lte=2021-12-01
// sales - getSalesList
export const getSalesQueryString = (query) =>
  axios.get(`${API_URL}/api/sales-statuses?${query}`);

// sales 리스트 기간별 조회
// projects?planStartDate_gte=2021-11-01&planStartDate_lte=2021-12-01
export const getSalesStartEndDay = (startEndofDay) =>
  axios.get(
    `${API_URL}/sales-performances?sales_rec_date_gte=${startEndofDay[0]}&sales_rec_date_lte=${startEndofDay[1]}`,
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
    axios.get(`${API_URL}/api/projects/count?code_status.id=1`),
    axios.get(`${API_URL}/api/projects/count?code_status.id=2`),
    axios.get(`${API_URL}/api/projects/count?code_status.id=3`),
    axios.get(`${API_URL}/api/projects/count?code_status.id=4`),
  ]);

// 프로젝트 카운트 v2
// 완료건 - 기간설정 필요 ex..6개월 or 1년 등..
export const projectCount = () =>
  axios.all([
    axios.get(`${API_URL}/api/projects/count?code_status.id=1`),
    axios.get(`${API_URL}/api/projects/count?code_status.id=2`),
    axios.get(`${API_URL}/api/projects/count?code_status.id=3`),
    axios.get(`${API_URL}/api/projects/count?code_status.id=4`),
  ]);

// 프로젝트 tasks 등록
export const apiAddProjectTasks = () => axios.post(`${API_URL}/project-tasks`);

// 고객사&진행중 프로젝트 리스트
export const apiCustomer_ProjectList = (id) =>
  axios.get(`${API_URL}/projects?customer.id=${id}&code_status.id=2`);

// 고객 정보 조회
export const apiCustomerList = () =>
  axios.get(`${API_URL}
/api/customers?pagination[pageSize]=100`);

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
export const apiUserList = () =>
  axios.get(
    `${API_URL}/api/users?filters[worker][$eq]=true&sort[0]=username%3Adesc`,
  );

// Project 별 work..
export const apiWorkId = (id) =>
  axios.get(`${API_URL}/api/works?project.id=${id}`);
