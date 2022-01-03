import { apiAddCustomer, apiAddProject } from '../lib/api/api';

export const addCustomer = (datas) => {
  apiAddCustomer(...datas)
    .then((result) => {
      console.log('고객등록 성공', result);
    })
    .catch((error) => {
      console.error('고객등록 실패', error);
    });
};
