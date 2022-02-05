import React from 'react';
import { Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectInfoTable = ({ projectInfo, updateForm }) => {
  console.log('projectInfo', projectInfo);
  return (
    <>
      <Descriptions title="Project Info" bordered column={3}>
        <Descriptions.Item label="구분">
          {projectInfo.code_type.name}
        </Descriptions.Item>
        <Descriptions.Item label="고객사" span={1}>
          {projectInfo.customer.name}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge status="processing" text={projectInfo.code_status.name} />
        </Descriptions.Item>
        <Descriptions.Item label="프로젝트명" span={2}>
          {projectInfo.name}
        </Descriptions.Item>
        <Descriptions.Item label="서비스">
          {projectInfo.code_service.name}
        </Descriptions.Item>
        <Descriptions.Item label="수주금액">
          {projectInfo.price}
        </Descriptions.Item>
        <Descriptions.Item label="계획(시작)">
          {projectInfo.planStartDate}
        </Descriptions.Item>
        <Descriptions.Item label="계획(종료)">
          {projectInfo.planEndDate}
        </Descriptions.Item>
        <Descriptions.Item label="실제(시작)">
          {projectInfo.startDate}
        </Descriptions.Item>
        <Descriptions.Item label="실제(종료)">
          {projectInfo.endDate}
        </Descriptions.Item>
        <Descriptions.Item label=""></Descriptions.Item>
        <Descriptions.Item label="비고">{projectInfo.remark}</Descriptions.Item>
      </Descriptions>
      {updateForm}
    </>
  );
};

export default ProjectInfoTable;
