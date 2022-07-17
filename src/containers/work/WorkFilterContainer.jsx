import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import WorkFilterForm from '../../components/work/WorkFilterForm';
import { apiUserList } from '../../lib/api/api';
import { set_worker } from '../../modules/work';

const Base = styled.div`
  width: 100%;
`;

const WorkFilterContainer = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  const [userList, setUserList] = useState('');
  //로그인 안했을때 오류 발생 개선 필요
  const [workerId, setWorkerId] = useState(auth.user.id);

  // 인증 정보 가져오기

  // 컴포넌트 렌더링 시 사용자 리스트 정보 가져옴
  useEffect(() => {
    apiUserList()
      .then((result) => {
        setUserList(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  }, []);

  // 로그인 작업자 정보 Redux 저장
  useEffect(() => {
    dispatch(set_worker({ userInfoId: workerId }));
  }, []);

  const userOnChange = (id) => {
    setWorkerId(id);
    dispatch(set_worker({ userInfoId: id }));
  };

  return (
    <Base>
      {userList ? (
        <WorkFilterForm
          userList={userList}
          workerId={workerId}
          userOnChange={userOnChange}
        />
      ) : (
        <div>로그인하세요</div>
      )}
    </Base>
  );
};

export default WorkFilterContainer;
