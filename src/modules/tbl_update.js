import * as api from '../lib/api/api';

const tbl_update = async (path, id, auth_data) => {
  console.log('update', { path, auth_data });
  //   const promise = new Promise((resolve, reject) => {
  //     // resolve 는 성공, reject 는 실패
  //     apiInsert(path, auth_data);
  //   });
  //   return promise;

  const response = await api.updateData(path, id, auth_data);

  return response;

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

export default tbl_update;
