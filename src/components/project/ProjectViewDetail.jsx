import React from 'react';
import { Statistic, Card, Row, Col, Progress } from 'antd';

const lists = [
  { id: 'w100', planDay: 5, totalTime: 12, progress: 10 },
  { id: 'w120', planDay: 2, totalTime: 0, progress: undefined },
  { id: 'w130', planDay: 3, totalTime: 4, progress: 10 },
  { id: 'w140', planDay: 7, totalTime: 6, progress: 50 },
  { id: 'w150', planDay: 6, totalTime: 0, progress: undefined },
  { id: 'w160', planDay: 5, totalTime: 20, progress: 75 },
  { id: 'w170', planDay: 4, totalTime: 5, progress: 10 },
  { id: 'w180', planDay: 8, totalTime: 1, progress: 10 },
  { id: 'w190', planDay: 10, totalTime: 0, progress: undefined },
];
console.log(lists);

const ProjectViewDetail = () => {
  let planTotal = 0;
  let totalWorkingTime = 0;
  lists.map((list) => {
    planTotal = planTotal + list.planDay;
    totalWorkingTime = totalWorkingTime + list.totalTime;
  });
  return (
    <>
      <h1>프로젝트 Detail</h1>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="작업일(계획/실행)"
                value={`${planTotal}일 / ${totalWorkingTime / 8}일`}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="작업시간(계획/실행)"
                value={`${planTotal * 8}시간 / ${totalWorkingTime}시간`}
                precision={1}
                valueStyle={{ color: '#cf1322' }}
                // prefix={<ArrowDownOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="증/감"
                value={planTotal * 8 - totalWorkingTime}
                // precision={2}
                valueStyle={{ color: '#3f8600' }}
                // prefix={<ArrowUpOutlined />}
                suffix="시간"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="작업경과"
                value="20"
                precision={1}
                valueStyle={{ color: '#3f8600' }}
                // prefix={<ArrowUpOutlined />}
                suffix="일"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <div>
        <Row gutter={16}>
          {lists.map((list) => {
            return (
              <div>
                <span>{list.id}</span>
                <Col>
                  <Progress
                    type="circle"
                    percent={list.progress}
                    format={() => `${list.planDay * 8} / ${list.totalTime}`}
                  />
                </Col>
              </div>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default ProjectViewDetail;
