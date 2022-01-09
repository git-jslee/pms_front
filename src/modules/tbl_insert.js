import React from 'react';
import { apiInsert } from '../lib/api/api';

const tbl_insert = async (path, auth_data) => {
  console.log('insert', { path, auth_data });
  //   const promise = new Promise((resolve, reject) => {
  //     // resolve 는 성공, reject 는 실패
  //     apiInsert(path, auth_data);
  //   });
  //   return promise;
  const promise = await apiInsert(path, auth_data);
  return promise;

  //   apiInsert(path, auth_data)
  //     .then((result) => {
  //       console.log(`${path} Insert 성공 : `, result);
  //       return result;
  //     })
  //     .catch((error) => {
  //       console.error(`${path} Insert 에러 발생 : `, error);
  //       return error;
  //     });
};

export default tbl_insert;
