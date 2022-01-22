import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesList } from '../../modules/sales';
import SalesListTable from '../../components/sales/SalesListTable';

const SalesListContainer = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(({ sales, loading }) => ({
    list: sales.data,
    loading: loading['sales/GET_SALESLIST'],
  }));

  console.log('saleslist', list);

  useEffect(() => {
    dispatch(getSalesList());
    // getProjectList();
  }, [dispatch]);

  return (
    <>
      {loading === false ? <SalesListTable list={list} /> : <div>로딩중</div>}
    </>
  );
};

export default SalesListContainer;
