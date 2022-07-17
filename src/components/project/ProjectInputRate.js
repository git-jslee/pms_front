import React from 'react';
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

const ProjectInputRate = ({ inputRate }) => {
  if (!inputRate) return <></>;
  const labels = Object.keys(inputRate);
  const data_de = labels.map((v) => {
    const result = inputRate[v]['1']
      ? Math.round((inputRate[v]['1'] / (40 * 3)) * 100)
      : 0;
    return result;
  });
  const data_pr = labels.map((v) => {
    const result = inputRate[v]['2']
      ? Math.round((inputRate[v]['2'] / (40 * 2)) * 100)
      : 0;
    return result;
  });
  const data_3d = labels.map((v) => {
    const result = inputRate[v]['3']
      ? Math.round((inputRate[v]['3'] / (40 * 1)) * 100)
      : 0;
    return result;
  });
  const data_mv = labels.map((v) => {
    const result = inputRate[v]['4']
      ? Math.round((inputRate[v]['4'] / (40 * 2)) * 100)
      : 0;
    return result;
  });

  // console.log('**labels**', labels);
  // console.log('**디자인**', data_de);
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
      {
        label: '3D',
        borderWidth: 1, // 테두리 두께
        data: data_3d, // 수치
        borderColor: 'rgb(75, 170, 93)',
        backgroundColor: 'rgba(75, 170, 93, 0.5)',
      },
      {
        label: 'Metaverse',
        borderWidth: 1, // 테두리 두께
        data: data_mv, // 수치
        borderColor: 'rgb(120, 32, 202)',
        backgroundColor: 'rgba(120, 32, 202, 0.5)',
      },
    ],
  };

  return (
    <>
      <ChartBlock>
        <Line data={data} width={300} height={120} options={options} />
      </ChartBlock>
    </>
  );
};

export default ProjectInputRate;
