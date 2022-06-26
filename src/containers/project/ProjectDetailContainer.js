import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../../lib/api/api';
// import apiQueryAll from '../../lib/api/apiQueryAll';
import fetchAllList from '../../lib/api/fetchAllList';
import ProjectDetailForm from '../../components/project/ProjectDetailForm';
import ProjectWorkListTable from '../../components/project/ProjectWorkListTable';
import {
  qs_workallByPid,
  qs_project,
  qs_changeallByPid,
} from '../../lib/api/queryProject';
import { Row, Col, Timeline } from 'antd';
import ProjectTimeline from '../../components/project/ProjectTimeline';
import moment from 'moment';

const ProjectDetailContainer = () => {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [works, setWorks] = useState();
  const [timeline, setTimeline] = useState();

  const get_worklistall = async (path, query, callback) => {
    try {
      const request = await fetchAllList({ path: path, qs: query, id: id });
      console.log(`<<<<< ${path} >>>>>>`, request);

      const work_array = request.map((v) => {
        const list = v.attributes;
        const _task = list.project_task.data.attributes.cus_task
          ? list.project_task.data.attributes.cus_task
          : list.project_task.data.attributes.code_task.data.attributes.name;
        return {
          key: v.id,
          id: v.id,
          task: _task,
          progress: list.code_progress.data.attributes.code,
          revision: list.revision ? list.revision : 0,
          workingDay: list.working_day,
          workingTime: list.working_time,
          worker: list.users_permissions_user.data.attributes.username,
          description: list.description,
        };
      });

      callback(work_array);
    } catch (error) {
      console.error(error);
    }
  };

  const get_project = async (path, query, callback) => {
    const request = await api.getQueryString(path, query());
    console.log(`<<<<< ${path} >>>>>>`, request.data.data);
    callback(request.data.data);
  };

  const get_changelistall = async (path, query, callback) => {
    try {
      const request = await fetchAllList({ path: path, qs: query, id: id });
      console.log(`<<<<< ${path} >>>>>>`, request);
      const time_array = request.map((v) => {
        const list = v.attributes;
        let _type;
        let _color = 'green';
        let _change = list.change;
        const _date = list.date
          ? moment(list.date).format('YYYY-MM-DD').toString()
          : moment(list.createdAt).format('YYYY-MM-DD').toString();
        if (list.type === 'init') {
          _type = '생성';
          _color = 'red';
        }
        if (list.type === 'code_status') {
          _type = '상태';
          _color = 'red';
        }
        if (list.type === 'state_100') {
          _type = '작업';
        }
        if (
          list.type === 'plan_startdate' ||
          list.type === 'plan_enddate' ||
          list.type === 'startdate' ||
          list.type === 'enddate' ||
          list.type === 'description' ||
          list.type === 'price' ||
          list.type === 'contracted'
        ) {
          _type = '변경';
          _change = `${list.type}, ${list.change}`;
        }
        //
        return {
          id: v.id,
          color: _color,
          children: `[${_type}: ${_date}] ${_change}`,
        };
      });
      setTimeline(time_array);
    } catch (error) {
      console.error(error);
    }
  };

  //work list
  useEffect(() => {
    get_project(`api/projects/${id}`, qs_project, setProject);
    get_worklistall(`api/works`, qs_workallByPid, setWorks);
    get_changelistall(`api/project-changes`, qs_changeallByPid, setTimeline);
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
            {timeline ? <ProjectTimeline timeline={timeline} /> : ''}
          </Col>
          <Col span={16}>
            <h3>project task info</h3>
          </Col>
        </Row>
      </div>
      <ProjectWorkListTable dataSource={works} />
    </>
  );
};

export default ProjectDetailContainer;
