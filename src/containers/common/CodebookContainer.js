import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCodebook } from '../../modules/codebook';

const CodeBookContainer = () => {
  const dispatch = useDispatch();
  // 컴포넌트가 처음 렌더링 될 때 codebook 디스패치
  useEffect(() => {
    dispatch(getCodebook());
  }, [dispatch]);

  return <></>;
};

export default CodeBookContainer;
