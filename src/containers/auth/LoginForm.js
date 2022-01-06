import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import { set_worker } from '../../modules/work';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    // user: auth.auth.user,
  }));
  const navigate = useNavigate();

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    // const username = e.target.username.value;
    // const password = e.target.password.value;
    const { username, password } = form;
    dispatch(
      login({
        username,
        password,
      }),
    );

    //구현예정
  };

  // 컴포넌트가 처음 렌더링될 때 form 을 초기화함.
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('인증오류발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      console.log(auth);
      //   dispatch(set_worker({ userInfoId: auth.auth.user.user_info.id }));
      // history.push('/')
      navigate('/');
      // 인증정보 LocalStorage 저장
      try {
        // localStorage.setItem('user', JSON.stringify(auth));
        // localStorage.setItem('jwt', auth.jwt);
        sessionStorage.setItem('user', JSON.stringify(auth));
      } catch (e) {
        console.log('loginForm>>>localStorage is not working');
      }
    }
  }, [auth, authError]);

  useEffect(() => {});

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={authError}
    />
  );
};

export default LoginForm;
