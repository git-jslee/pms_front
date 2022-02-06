import React from 'react';
import { Statistic, Card, Row, Col, Progress, Divider } from 'antd';

// const lists = [
//   { id: 'w100', planDay: 5, totalTime: 12, progress: 10 },
//   { id: 'w120', planDay: 2, totalTime: 0, progress: undefined },
//   { id: 'w130', planDay: 3, totalTime: 4, progress: 10 },
//   { id: 'w140', planDay: 7, totalTime: 6, progress: 50 },
//   { id: 'w150', planDay: 6, totalTime: 0, progress: undefined },
//   { id: 'w160', planDay: 5, totalTime: 20, progress: 75 },
//   { id: 'w170', planDay: 4, totalTime: 5, progress: 10 },
//   { id: 'w180', planDay: 8, totalTime: 1, progress: 10 },
//   { id: 'w190', planDay: 10, totalTime: 0, progress: undefined },
// ];
// code: "w100", id: 1 ,name: "기획 구성", planDay: 0, progress: 25, sort: 100, totalTime: 4

const ProjectStatistics = ({ statistic }) => {
  console.log('**statistic', statistic);
  let planTotal = 0;
  let totalWorkingTime = 0;
  statistic.map((list) => {
    planTotal = planTotal + list.planDay;
    totalWorkingTime = totalWorkingTime + list.totalTime;
  });

  return (
    <>
      <h3>Project Statistic</h3>
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
                title="완료예정"
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
        <Divider />
      </div>
      <br />
      <div>
        <Row gutter={16}>
          {statistic.map((list) => {
            return (
              <div>
                <span>{list.name}</span>
                <Col>
                  <Card>
                    {/* <span>{list.id}</span> */}
                    <Statistic
                      title="계획 / 실행"
                      value={`${list.planDay * 8} / ${list.totalTime}`}
                      // precision={1}
                      valueStyle={{ color: '#3f8600' }}
                      // prefix={<ArrowUpOutlined />}
                      suffix="h"
                    />
                    <Progress
                      // type="circle"
                      steps={5}
                      percent={list.progress}
                      // width={80}
                      // format={() => `${list.planDay * 8} / ${list.totalTime}`}
                    />
                  </Card>
                </Col>
              </div>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default ProjectStatistics;
