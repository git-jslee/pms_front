import React, { useState } from 'react';
import { Button, Table, Space, Spin, Row, Col, Descriptions } from 'antd';

const ProjectDetailDiscription = ({ project }) => {
  console.log('1111111>>>>>>>>>>>>>1111111', project);
  const $ = project.attributes;
  // const tasks = $.project_tasks.data;
  // console.log('22222222>>>>>>>>>>>>>2222222', tasks);
  // const $task = (() => {
  //   let planday = 0;
  //   let worktime = 0;
  //   let planstartdate;
  //   let startdate;
  //   const array = tasks.map((task, index) => {
  //     planday += task.attributes.plan_day * task.attributes.manpower;
  //     worktime += task.attributes.total_time + task.attributes.other_totaltime;
  //   });
  //   return {
  //     planday: planday,
  //     worktime: worktime,
  //     planstartdate: planstartdate,
  //     startdate: startdate,
  //   };
  // })();
  // console.log('33333333333>>>>>>>>>>>>>333333', $task);
  return (
    <>
      <Row>
        <Descriptions
          title={`${project.id} - ${project.attributes.customer.data.attributes.name} - ${project.attributes.name}`}
          bordered
          column={7}
          labelStyle={{ backgroundColor: '#d6e4ff' }}
          contentStyle={{ backgroundColor: '#f0f5ff' }}
        >
          <Descriptions.Item label="계획시작">
            {project.plan_startdate}
          </Descriptions.Item>
          <Descriptions.Item label="기준(일)">
            {project.base_day}
          </Descriptions.Item>
          <Descriptions.Item label="계획(일)">
            {project.total_plan}
          </Descriptions.Item>
          <Descriptions.Item label="상태">
            {$.code_status.data.attributes.name}
          </Descriptions.Item>
          <Descriptions.Item label="issue">0</Descriptions.Item>
          <Descriptions.Item label="외주작업">NO</Descriptions.Item>
          <Descriptions.Item label="계약">
            {$.contracted === true ? 'YES' : 'NO'}
          </Descriptions.Item>
          {/* <Descriptions.Item label="risk">10</Descriptions.Item>
           */}
          <Descriptions.Item label="시작일">
            {project.startdate}
          </Descriptions.Item>
          <Descriptions.Item label="최근작업">
            {$.last_workupdate}
          </Descriptions.Item>
          <Descriptions.Item label="작업(일)">
            {project.total_work}
          </Descriptions.Item>
          <Descriptions.Item label="진행률">{`${project.project_progress} %`}</Descriptions.Item>
          <Descriptions.Item label="risk">0</Descriptions.Item>
          <Descriptions.Item label="외주비용"></Descriptions.Item>
          <Descriptions.Item label="금액">{$.price}</Descriptions.Item>
          {/* <Descriptions.Item label="risk">10</Descriptions.Item>
           */}
          <Descriptions.Item label="완료예정">
            {$.plan_enddate}
          </Descriptions.Item>
          <Descriptions.Item label="완료일"></Descriptions.Item>
          <Descriptions.Item label="경과"></Descriptions.Item>
          <Descriptions.Item label="비 고" span={4}>
            {$.description}
          </Descriptions.Item>
        </Descriptions>
      </Row>
    </>
  );
};

export default ProjectDetailDiscription;
