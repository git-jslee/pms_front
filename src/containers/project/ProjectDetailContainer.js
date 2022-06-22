import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../../lib/api/api';
import ProjectDetailForm from '../../components/project/ProjectDetailForm';
import ProjectWorkListTable from '../../components/project/ProjectWorkListTable';
import { qs_worksByPid } from '../../lib/api/query';
import { Row, Col, Timeline } from 'antd';

const ProjectDetailContainer = () => {
  const { id } = useParams();

  const api_request = async (path, query) => {
    const request = await api.getQueryString('api/works', query);
    return request;
  };
  //work list
  useEffect(() => {
    //
    const query = qs_worksByPid(id);
    const request = api_request('api/works', query).then((result) => {
      console.log('>>>>>>', result);
    });
  });

  return (
    <>
      <ProjectDetailForm />
      <div>
        <Row>
          <Col span={8}>
            <h3>time line</h3>
            <Timeline>
              <Timeline.Item color="green">
                Create a project 2022-01-01
              </Timeline.Item>
              <Timeline.Item color="green">start 2022-01-01</Timeline.Item>
              <Timeline.Item color="red">
                <p>status : 보류 2022-02-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>status : 진행중 2022-02-11</p>
              </Timeline.Item>
              <Timeline.Item color="green">
                task 기획/구성 2022-02-20
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>status : 대기 2022-03-01</p>
              </Timeline.Item>
              <Timeline.Item
                color="#00CCFF"
                //   dot={<SmileOutlined />}
              >
                <p>완료</p>
              </Timeline.Item>
            </Timeline>
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
