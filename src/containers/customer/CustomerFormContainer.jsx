import React from 'react';
import CustomerForm from '../../components/customer/CustomerForm';
import { addCustomer } from '../../modules/customerForm';

const CustomerFormContainer = () => {
  const onSubmit = (values) => {
    console.log('고객등록-onSubmit..');
    const auth =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQxMDA4NzE5LCJleHAiOjE2NDM2MDA3MTl9.axMN2VemKxDxPeZJ_zfvhGm8FmMUVd5MkPe_lED0ocM';
    const datas = [
      {
        name_eng: values.name_eng,
        name: values.name,
      },
      {
        headers: {
          Authorization: 'Bearer ' + auth,
        },
      },
    ];
    try {
      addCustomer(datas);
      // 고객등록 성공시 페이지 이동 기능 구현 필요
    } catch (error) {
      console.log('고객등록 에러', error);
    }
  };

  return (
    <>
      <CustomerForm onSubmit={onSubmit} />
    </>
  );
};

export default CustomerFormContainer;
