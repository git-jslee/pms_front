import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSalesCodebook } from '../../modules/codebook';
import { getCustomerlist } from '../../modules/customerList';

const SalesCodebookContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // salesCodebook();
    dispatch(getSalesCodebook());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCustomerlist());
  }, [dispatch]);

  return <></>;
};

export default SalesCodebookContainer;
