import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { InputNumber, Slider, Row, Col } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ChartBlock = styled.div`
  /* height: 500px; */
  /* width: 95%; */
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'CWCC 투입률 Line Chart',
    },
  },
};

const ProjectInputRateChart = ({ inputRate, teamHistory, onChangeSlider, sliderInputValue }) => {
  //
  // const [ inputValue, setInputValue] = useState(6);
  // const onChangeSlider = (newValue) => {
  //   console.log('--', newValue)
  //   setInputValue(newValue);
  // };
  //

  if (!inputRate) return <></>;
  const labels = Object.keys(inputRate);
  console.log('**labels**', labels);
  console.log('**inputRate**', inputRate);
  console.log('**teamHistory**', teamHistory);

  //디자인사업부
  const data_de = labels.map((v) => {
    const result = inputRate[v]['DE']
      ? Math.round(
          (inputRate[v]['DE']['time'] / (40 * inputRate[v]['DE']['mp'])) * 100,
        )
      : 0;
    return result;
  });

  //영상사업부
  const data_pr = labels.map((v) => {
    const result = inputRate[v]['VE']
      ? Math.round(
          (inputRate[v]['VE']['time'] / (40 * inputRate[v]['VE']['mp'])) * 100,
        )
      : 0;
    return result;
  });

  //기술연구소
  const data_mv = labels.map((v) => {
    const result = inputRate[v]['RD']
      ? Math.round(
          (inputRate[v]['RD']['time'] / (40 * inputRate[v]['RD']['mp'])) * 100,
        )
      : 0;
    return result;
  });
  // console.log('**labels**', labels);
  console.log('**디자인**', data_de);
  // console.log('**영상**', data_pr);

  const data = {
    // 각 막대별 라벨
    labels,
    datasets: [
      {
        label: '디자인',
        borderWidth: 1, // 테두리 두께
        data: data_de, // 수치
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '영상',
        borderWidth: 1, // 테두리 두께
        data: data_pr, // 수치
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      // {
      //   label: '3D',
      //   borderWidth: 1, // 테두리 두께
      //   data: data_3d, // 수치
      //   borderColor: 'rgb(75, 170, 93)',
      //   backgroundColor: 'rgba(75, 170, 93, 0.5)',
      // },
      {
        label: '연구소',
        borderWidth: 1, // 테두리 두께
        data: data_mv, // 수치
        borderColor: 'rgb(120, 32, 202)',
        backgroundColor: 'rgba(120, 32, 202, 0.5)',
      },
    ],
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Slider
            min={1}
            max={12}
            onChange={onChangeSlider}
            value={sliderInputValue}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={12}
            style={{
              margin: '0 16px',
            }}
            value={sliderInputValue}
            onChange={onChangeSlider}
          />
        </Col>
      </Row>
      <ChartBlock>
        <Line data={data} width={300} height={120} options={options} />
      </ChartBlock>
    </>
  );
};

export default ProjectInputRateChart;
