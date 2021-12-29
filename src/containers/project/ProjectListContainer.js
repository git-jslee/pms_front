import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList } from '../../modules/projectList';
import ProjectListTable from '../../components/project/ProjectListTable';

const ProjectListContainer = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(({ projectlist }) => ({
        data: projectlist.data,
        status: projectlist.status,
        error: projectlist.error,
    }))

    // 컴포넌트가 처음 렌더링 될 때 codebook 정보 가져옴
    // 페이지 이동 후 재 접속시.. 프로젝트 리스트 다시 가져옴...코드 수정 필요..
    useEffect(() => {
        dispatch(getProjectList());
    }, [dispatch]);

    useEffect(() => {
        if(error) {
            console.log('프로젝트 리스트 가져오기 오류');
            console.log(error);
        }
        if(status) {
            console.log("프로젝트 리스트 가져오기 성공");
            console.log(status);
        }
    }, [error, status])

    return (
        <>
        { data ? (<ProjectListTable lists={data} />
        ) : (
            <div>로딩중</div>
        )}
            
        </>
    );
};

export default ProjectListContainer;