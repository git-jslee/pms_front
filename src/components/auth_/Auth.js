import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config/constants';

const Auth = () => {
    const login = async (id, password) => {
        const { data } = await axios.post(`${API_URL}/auth/local`, {
          identifier: id,
          password: password,
        })
        console.log(data.jwt);
        return (<h1>로그인 성공..</h1>)
      }
      login('crea@creacorp.co.kr','crea0425');
  
};

export default Auth;