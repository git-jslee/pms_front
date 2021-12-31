import React from 'react';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import Button from '../components/common/Button';
import ProjectListContainer from '../containers/project/ProjectListContainer';

const ProjectPage = () => {
    return (
        <>
            <HeaderContainer />
            <SiteHeader />
            <h1>프로젝트 페이지</h1>
            <Link to="/addproject">
                <Button>프로젝트 등록</Button>
            </Link>
            <ProjectListContainer />
        </>
    );
};

export default ProjectPage;