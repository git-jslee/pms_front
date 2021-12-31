import React from 'react';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import Button from '../components/common/Button';

const MainPage = () => {
    return (
        <>
        <HeaderContainer />
        <SiteHeader />
        <br />
        <Link to='/project'>
            <Button>프로젝트</Button>
        </Link>
        <Link to='/work'>
            <Button>작업</Button>
        </Link>
        <Link to='/customer'>
            <Button>고객사</Button>
        </Link>
        </>
    );
};

export default MainPage;