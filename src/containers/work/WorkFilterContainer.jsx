import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import WorkFilterForm from '../../components/work/WorkFilterForm';
import { apiUserList } from '../../lib/api/api';

const WorkFilterContainer = () => {
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  const [userList, setUserList] = useState('');
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

  const userOnChange = (id) => {
    console.log('작업자 선택:', id);
  };

  return (
    <>
      {userList && auth ? (
        <WorkFilterForm
          userList={userList}
          user_info_id={auth.user.user_info.id}
          userOnChange={userOnChange}
        />
      ) : (
        <div>로그인하세요</div>
      )}
    </>
  );
};

export default WorkFilterContainer;
