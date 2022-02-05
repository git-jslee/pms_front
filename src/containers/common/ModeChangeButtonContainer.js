import React from 'react';
import Button from '../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../../modules/common';

const ModeChangeButtonContainer = () => {
  const dispatch = useDispatch();

  // 편집모드 정보 가져오기
  const { mode } = useSelector(({ common }) => ({
    mode: common.mode,
  }));

  const onClick = () => {
    if (mode === 'VIEW') {
      dispatch(changeMode({ mode: 'EDIT' }));
    } else if (mode === 'EDIT') {
      dispatch(changeMode({ mode: 'VIEW' }));
    }
    console.log('mode(view/edit)', mode);
  };

  return (
    <>
      <Button onClick={onClick}>{mode === 'VIEW' ? 'EDIT' : 'VIEW'}</Button>
    </>
  );
};

export default ModeChangeButtonContainer;
