import React from 'react';
import Button from '../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditmode } from '../../modules/projectForm';

const EditActionButtonContainer = () => {
  const dispatch = useDispatch();

  // 편집모드 정보 가져오기
  const { editdisabled } = useSelector(({ projectForm }) => ({
    editdisabled: projectForm.editdisabled,
  }));

  const onClick = () => {
    dispatch(changeEditmode(!editdisabled));
    console.log(']]]onclick]]]', editdisabled);
  };

  return (
    <>
      <Button onClick={onClick}>{!editdisabled ? 'VIEW' : 'EDIT'}</Button>
    </>
  );
};

export default EditActionButtonContainer;
