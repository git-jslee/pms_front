import axios from 'axios';
import { API_URL } from '../../config/constants';

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

// 프로젝트 리스트
export const apiProjects = () => axios.get(`${API_URL}/projects`);
