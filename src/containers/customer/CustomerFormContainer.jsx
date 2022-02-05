import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerForm from '../../components/customer/CustomerForm';
import { addCustomer } from '../../modules/customerForm';
import { useNavigate } from 'react-router-dom';

const CustomerFormContainer = () => {
  const navigate = useNavigate();
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  // 고객등록 폼 작성 후 submit 클릭시
  const onSubmit = (values) => {
    console.log('고객등록-onSubmit..');
    const jwt = auth.jwt;
    const datas = [
      {
        name_eng: values.name_eng,
        name: values.name,
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ];
    try {
      addCustomer(datas);
      // 고객등록 성공시 페이지 이동 기능 구현 필요
      navigate('/customer');
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
