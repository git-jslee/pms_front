import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
import moment from 'moment';
import { Row, Col, Timeline, Button } from 'antd';
import { LeftSquareTwoTone } from '@ant-design/icons';
import ProjectTimeline from '../../components/project/ProjectTimeline';
import ProjectTaskTable from '../../components/project/ProjectTaskTable';
import { changeSubMenu } from '../../modules/common';

const Base = styled.div`
  width: 100%;
`;

const ProjectDetailContainer = ({ id }) => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  // const { id } = useParams();
  const [project, setProject] = useState();
  const [tasks, setTasks] = useState();
  const [works, setWorks] = useState();
  const [timeline, setTimeline] = useState();

  //work list
  useEffect(() => {
    get_project(`api/projects/${id}`, qs_project, setProject);
    get_worklistall(`api/works`, qs_workallByPid, setWorks);
    get_changelistall(`api/project-changes`, qs_changeallByPid, setTimeline);
  }, []);

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
          otherTime: list.other_time,
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
    setProject(request.data.data);
    console.log('>>>>>>>project', request.data.data);
    const tasks = request.data.data.attributes.project_tasks.data;
    const sortTasks = tasks.sort((a, b) => {
      return (
        a.attributes.code_task.data.attributes.sort -
        b.attributes.code_task.data.attributes.sort
      );
    });
    setTasks(sortTasks);
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

  // <-- tasks

  // tasks -->

  return (
    <Base>
      <div>
        <Row>
          <LeftSquareTwoTone
            // onClick={() => naviagte(-1)}
            onClick={() => dispatch(changeSubMenu('status'))}
            style={{ fontSize: '30px', color: '#08c' }}
          />
          <h1>{project ? project.attributes.name : '-'}</h1>
        </Row>
        <Row gutter={16}>
          <Col span={18}>
            <ProjectTaskTable tasks={tasks} />
          </Col>
          <Col span={6}>
            <h3>Time line</h3>
            {timeline ? <ProjectTimeline timeline={timeline} /> : ''}
          </Col>
        </Row>
      </div>
      <ProjectWorkListTable dataSource={works} />
    </Base>
  );
};

export default ProjectDetailContainer;
