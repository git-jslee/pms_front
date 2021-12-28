import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
    const { user } = useSelector(({ auth }) => ({ user: auth.auth}));
    console.log('>>>username>>>', user)
    return (
        <Header user={user} />
        // <Header />
    );
};

export default HeaderContainer;