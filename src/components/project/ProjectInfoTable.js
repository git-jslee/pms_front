import React from 'react';
import { Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectInfoTable = ({ projectInfo, updateForm }) => {
  console.log('>>>>>>', projectInfo);
  const pview = projectInfo.attributes;
  console.log('projectInfo', projectInfo);
  return (
    <>
      <Descriptions title="Project Info" bordered column={3}>
        <Descriptions.Item label="구분">
          {/* {pview.code_type.data.attributes.name} */}
        </Descriptions.Item>
        <Descriptions.Item label="고객사" span={1}>
          {pview.customer.data.attributes.name}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge
            status="processing"
            text={pview.code_status.data.attributes.name}
          />
        </Descriptions.Item>
        <Descriptions.Item label="프로젝트명" span={2}>
          {pview.name}
        </Descriptions.Item>
        <Descriptions.Item label="서비스">
          {pview.code_service.data.attributes.name}
        </Descriptions.Item>
        <Descriptions.Item label="수주금액">{pview.price}</Descriptions.Item>
        <Descriptions.Item label="계획(시작)">
          {pview.plan_startdate}
        </Descriptions.Item>
        <Descriptions.Item label="계획(종료)">
          {pview.plan_enddate}
        </Descriptions.Item>
        <Descriptions.Item label="실제(시작)">
          {pview.startdate}
        </Descriptions.Item>
        <Descriptions.Item label="실제(종료)">
          {pview.enddate}
        </Descriptions.Item>
        <Descriptions.Item label=""></Descriptions.Item>
        <Descriptions.Item label="비고">{pview.description}</Descriptions.Item>
      </Descriptions>
      {updateForm}
    </>
  );
};

export default ProjectInfoTable;
