import * as api from '../../lib/api/api';

const jwt_data = (data) => {
  const user = sessionStorage.getItem('user');
  const jwt = JSON.parse(user).jwt;
  //   console.log('*** jwt ***', user, jwt);
  const result = [
    {
      data,
    },
    {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    },
  ];
  return result;
};

// Insert 작업
export const tbl_insert = async (path, data) => {
  console.log(`**** tbl_insert - ${path} ****`);
  const response = await api.createData(path, jwt_data(data));
  return response;
};

// Update 작업
export const tbl_update = async (path, id, data) => {
  console.log(`**** tbl_update - ${path}:${id} ****`);
  const response = await api.updateData(path, id, jwt_data(data));
  return response;
};
