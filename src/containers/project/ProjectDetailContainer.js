import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../../lib/api/api';
import ProjectDetailForm from '../../components/project/ProjectDetailForm';
import ProjectWorkListTable from '../../components/project/ProjectWorkListTable';
import { qs_worksByPid, qs_projectByPid } from '../../lib/api/query';
import { Row, Col, Timeline } from 'antd';
import ProjectTimeline from '../../components/project/ProjectTimeline';

const ProjectDetailContainer = () => {
  const { id } = useParams();
  const [timeline, setTimeline] = useState();

  const getProjectWorkList = async (path, query) => {
    const request = await api.getQueryString(path, query);
    console.log(`<<<<< ${path} >>>>>>`, request.data);
  };

  //work list
  useEffect(() => {
    getProjectWorkList(`api/projects/${id}`, qs_projectByPid());
    getProjectWorkList(`api/works`, qs_worksByPid(id));
  }, []);

  const timeline_sample = [
    { id: 1, color: 'green', children: '[생성: 2022-01-01]' },
    { id: 2, color: 'green', children: '[시작: 2022-01-01]' },
    { id: 3, color: 'red', children: '[상태: 2022-02-11] 진행중->보류' },
    { id: 4, color: 'red', children: '[상태: 2022-02-11] 보류->진행중' },
    { id: 5, children: '[변경: 2022-02-20] 시작일 2022-01-20->2022-01-20' },
    { id: 6, children: '[작업: 2022-02-20] 기획/구성 완료' },
    { id: 7, color: '#00CCFF', children: '[완료: 2022-04-20]' },
  ];

  return (
    <>
      <ProjectDetailForm />
      <div>
        <Row>
          <Col span={8}>
            <h3>Time line</h3>
            <ProjectTimeline timeline_sample={timeline_sample} />
          </Col>
          <Col span={16}>
            <h3>project task info</h3>
          </Col>
        </Row>
      </div>
      <ProjectWorkListTable />
    </>
  );
};

export default ProjectDetailContainer;
