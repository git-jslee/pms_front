import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerlist } from '../../modules/customerList';
import CustomerLIstTable from '../../components/customer/CustomerLIstTable';
import AutoComplete from '../../components/common/AutoComplete';

const CustomerListContainer = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(({ customerList }) => ({
    data: customerList.data,
    status: customerList.status,
    error: customerList.error,
  }));

  // 컴포넌츠 처음 렌더링시 고객리스트 가져옴(디스패치..)
  useEffect(() => {
    dispatch(getCustomerlist());
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      console.log('고객리스트 가져오기 성공');
    }
    if (error) {
      console.log('고객리스트 가져오기 실패');
      console.log(error);
    }
  }, [status]);

  return (
    <>
      <AutoComplete lists={data} />
      {status ? (
        <CustomerLIstTable lists={data} />
      ) : (
        <h1>로객리스트 로딩중..</h1>
      )}
    </>
  );
};

export default CustomerListContainer;
