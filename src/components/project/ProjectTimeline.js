import React from 'react';
import { Timeline } from 'antd';

const ProjectTimeline = ({ timeline }) => {
  const TimelineItem = ({ item }) => {
    const array = item.map((v) => {
      return (
        <Timeline.Item key={v.id} color={v.color}>
          {v.children}
        </Timeline.Item>
      );
    });
    return array;
  };
  return (
    <>
      <Timeline>
        <TimelineItem item={timeline} />
      </Timeline>
    </>
  );
};

export default ProjectTimeline;
