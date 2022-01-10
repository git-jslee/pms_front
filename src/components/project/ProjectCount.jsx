import React from 'react';
import { Progress } from 'antd';

const ProjectCount = ({ count }) => {
  let sum = 0;
  const total = count.map((data) => {
    sum = sum + data.data;
  });
  //   console.log('total', sum);
  return (
    <>
      {/* <div>
        <span>[완료: {count[3].data}건] .. </span>
        <span>[진행중: {count[1].data}건] .. </span>
        <span>[보류: {count[2].data}건] .. </span>
        <span>[시작전: {count[0].data}건] .. </span>
      </div> */}
      {/* <ul className="serviceStats stats6 clearfix">
        <li>
          <p className="tit">완료</p>
          <p className="num">
            <b>{count[3].data}</b>건
          </p>
        </li>
        <li>
          <p className="tit">진행중</p>
          <p className="num">
            <b>{count[1].data}</b>건
          </p>
        </li>
        <li>
          <p className="tit">보류</p>
          <p className="num">
            <b>{count[2].data}</b>건
          </p>
        </li>
        <li>
          <p className="tit">시작전</p>
          <p className="num">
            <b>{count[0].data}</b>건
          </p>
        </li>
      </ul> */}

      <Progress type="circle" percent={100} format={() => `전체-${sum}건`} />
      <span>--</span>
      <Progress
        type="circle"
        percent={(count[3].data / sum) * 100}
        format={() => `완료-${count[3].data}건`}
        strokeColor="black"
      />
      <span>--</span>
      <Progress
        type="circle"
        percent={(count[1].data / sum) * 100}
        format={() => `진행-${count[1].data}건`}
      />
      <span>--</span>
      <Progress
        type="circle"
        percent={(count[2].data / sum) * 100}
        format={() => `보류-${count[2].data}건`}
        status="exception"
      />
      <span>--</span>
      <Progress
        type="circle"
        percent={(count[0].data / sum) * 100}
        format={() => `시작전-${count[0].data}건`}
      />
    </>
  );
};

export default ProjectCount;
