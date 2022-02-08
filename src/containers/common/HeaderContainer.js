import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/auth';

const HeaderContainer = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    try {
      sessionStorage.removeItem('user'); //세션 스토리지에서 user 제거
      navigate('/login'); //Login page 이동
    } catch (e) {
      console.log(e);
    }
  };
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
