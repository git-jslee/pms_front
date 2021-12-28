import axios from "axios";
import { API_URL } from "../../config/constants";

// 로그인
export const loginUser = ( username, password ) =>
    axios.post(`${API_URL}/auth/local`, { 
        identifier: username,
        password: password,
    });

// 회원가입
export const register = ({ username, password }) =>
    axios.post('/api/auth/register', { username, password })


// 로그인 상태 확인
export const check = () => axios.get('/api/auth/check')