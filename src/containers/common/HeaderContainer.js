import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/auth';

const HeaderContainer = () => {
    const { user } = useSelector(({ auth }) => ({ user: auth.auth}));
    console.log('>>>username>>>', user)
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        try {
            sessionStorage.removeItem('user'); //세션 스토리지에서 user 제거
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Header user={user} onLogout={onLogout} />
        // <Header />
    );
};

export default HeaderContainer;