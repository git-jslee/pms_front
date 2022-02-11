import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Space, Row, Col } from 'antd';
const { Column, ColumnGroup } = Table;

const SalesStatisticsTable = ({ sumValue, totalMonth, onClick }) => {
  console.log('==totalMonth==', totalMonth);

  // 1 -> 0%, 2 -> 50%, 3 -> 70%, 4 -> 90%, 5 -> 100%, 99 -> 확정
  // 전월(previous month)
  const _pm_999 = sumValue[-1][99] || '';
  // 당월(current month)
  const _cm_50 = sumValue[0][2] || '';
  const _cm_70 = sumValue[0][3] || '';
  const _cm_90 = sumValue[0][4] || '';
  const _cm_100 = sumValue[0][5] || '';
  const _cm_999 = sumValue[0][99] || '';
  // 익월(next month)
  const _nm_50 = sumValue[1][2] || '';
  const _nm_70 = sumValue[1][3] || '';
  const _nm_90 = sumValue[1][4] || '';
  const _nm_100 = sumValue[1][5] || '';
  const _nm_999 = sumValue[1][99] || '';
  // 익익월(next next month)
  const _nnm_50 = sumValue[2][2] || '';
  const _nnm_70 = sumValue[2][3] || '';
  const _nnm_90 = sumValue[2][4] || '';
  const _nnm_100 = sumValue[2][5] || '';
  const _nnm_999 = sumValue[2][99] || '';

  const data_pm = [
    {
      key: '99',
      month: totalMonth[0],
      probibility: '확정',
      pm_sales: _pm_999[0].toLocaleString('ko-KR'),
      pm_profit: _pm_999[1].toLocaleString('ko-KR'),
    },
    {
      key: '5',
      probibility: '100%',
    },
    {
      key: '4',
      probibility: '90%',
    },
    {
      key: '3',
      probibility: '70%',
    },
    {
      key: '2',
      probibility: '50%',
    },
  ];

  const data_cm = [
    {
      key: '99',
      month: totalMonth[1],
      cm_sales: _cm_999[0].toLocaleString('ko-KR'),
      cm_profit: _cm_999[1].toLocaleString('ko-KR'),
    },
    {
      key: '5',
      month: totalMonth[1],
      cm_salesProjection: _cm_100[0].toLocaleString('ko-KR'),
      cm_profitProjection: _cm_100[1].toLocaleString('ko-KR'),
    },
    {
      key: '4',
      month: totalMonth[1],
      cm_salesProjection: _cm_90[0].toLocaleString('ko-KR'),
      cm_profitProjection: _cm_90[1].toLocaleString('ko-KR'),
    },
    {
      key: '3',
      month: totalMonth[1],
      cm_salesProjection: _cm_70[0].toLocaleString('ko-KR'),
      cm_profitProjection: _cm_70[1].toLocaleString('ko-KR'),
    },
    {
      key: '2',
      month: totalMonth[1],
      cm_salesProjection: _cm_50[0].toLocaleString('ko-KR'),
      cm_profitProjection: _cm_50[1].toLocaleString('ko-KR'),
    },
  ];

  const data_nm = [
    {
      key: '99',
      month: totalMonth[2],
      nm_salesProjection: _nm_999[0].toLocaleString('ko-KR'),
      nm_profitProjection: _nm_999[1].toLocaleString('ko-KR'),
    },
    {
      key: '5',
      month: totalMonth[2],
      nm_salesProjection: _nm_100[0].toLocaleString('ko-KR'),
      nm_profitProjection: _nm_100[1].toLocaleString('ko-KR'),
    },
    {
      key: '4',
      month: totalMonth[2],
      nm_salesProjection: _nm_90[0].toLocaleString('ko-KR'),
      nm_profitProjection: _nm_90[1].toLocaleString('ko-KR'),
    },
    {
      key: '3',
      month: totalMonth[2],
      nm_salesProjection: _nm_70[0].toLocaleString('ko-KR'),
      nm_profitProjection: _nm_70[1].toLocaleString('ko-KR'),
    },
    {
      key: '2',
      month: totalMonth[2],
      nm_salesProjection: _nm_50[0].toLocaleString('ko-KR'),
      nm_profitProjection: _nm_50[1].toLocaleString('ko-KR'),
    },
  ];

  const data_nnm = [
    {
      key: '99',
      month: totalMonth[3],
      nnm_salesProjection: _nnm_999[0].toLocaleString('ko-KR'),
      nnm_profitProjection: _nnm_999[0].toLocaleString('ko-KR'),
    },
    {
      key: '5',
      month: totalMonth[3],
      nnm_salesProjection: _nnm_100[0].toLocaleString('ko-KR'),
      nnm_profitProjection: _nnm_100[1].toLocaleString('ko-KR'),
    },
    {
      key: '4',
      month: totalMonth[3],
      nnm_salesProjection: _nnm_90[0].toLocaleString('ko-KR'),
      nnm_profitProjection: _nnm_90[1].toLocaleString('ko-KR'),
    },
    {
      key: '3',
      month: totalMonth[3],
      nnm_salesProjection: _nnm_70[0].toLocaleString('ko-KR'),
      nnm_profitProjection: _nnm_70[1].toLocaleString('ko-KR'),
    },
    {
      key: '2',
      month: totalMonth[3],
      nnm_salesProjection: _nnm_50[0].toLocaleString('ko-KR'),
      nnm_profitProjection: _nnm_50[1].toLocaleString('ko-KR'),
    },
  ];

  return (
    <>
      <Row>
        <Col span={6} offset={0}>
          <Table
            pagination={false}
            // columns={columns}
            dataSource={data_pm}
            // scroll={{ x: 800 }}
            size="small"
            // table OnClick 이벤트 처리
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  // console.log('table click event', record);
                  onClick(record);
                },
              };
            }}
          >
            <Column
              title="확률"
              width={55}
              dataIndex="probibility"
              key="probibility"
              align="right"
            />

            <ColumnGroup title="전월">
              <Column
                title="실제매출액"
                width={100}
                dataIndex="pm_sales"
                key="pm_sales"
                align="right"
              />
              <Column
                title="실제매출이익"
                width={100}
                dataIndex="pm_profit"
                key="pm_profit"
                align="right"
              />
            </ColumnGroup>
          </Table>
        </Col>
        <Col span={8} offset={0}>
          <Table
            pagination={false}
            dataSource={data_cm}
            size="small"
            // table OnClick 이벤트 처리
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  onClick(record);
                },
              };
            }}
          >
            <ColumnGroup title="당월">
              <Column
                title="예상매출액"
                width={100}
                dataIndex="cm_salesProjection"
                key="cm_salesProjection"
                align="right"
              />
              <Column
                title="예상매출이익"
                width={100}
                dataIndex="cm_profitProjection"
                key="cm_profitProjection"
                align="right"
              />
              <Column
                title="실제매출액"
                width={100}
                dataIndex="cm_sales"
                key="cm_sales"
                align="right"
              />
              <Column
                title="실제매출이익"
                width={100}
                dataIndex="cm_profit"
                key="cm_profit"
                align="right"
              />
            </ColumnGroup>
          </Table>
        </Col>
        <Col span={5} offset={0}>
          <Table
            pagination={false}
            dataSource={data_nm}
            size="small"
            // table OnClick 이벤트 처리
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  onClick(record);
                },
              };
            }}
          >
            <ColumnGroup title="익월">
              <Column
                title="예상매출액"
                width={100}
                dataIndex="nm_salesProjection"
                key="nm_salesProjection"
                align="right"
              />
              <Column
                title="예상매출이익"
                width={100}
                dataIndex="nm_profitProjection"
                key="nm_profitProjection"
                align="right"
              />
            </ColumnGroup>
          </Table>
        </Col>
        <Col span={5} offset={0}>
          <Table
            pagination={false}
            dataSource={data_nnm}
            size="small"
            // table OnClick 이벤트 처리
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  onClick(record);
                },
              };
            }}
          >
            <ColumnGroup title="익익월">
              <Column
                title="예상매출액"
                width={100}
                dataIndex="nnm_salesProjection"
                key="nnm_salesProjection"
                align="right"
              />
              <Column
                title="예상매출이익"
                width={100}
                dataIndex="nnm_profitProjection"
                key="nnm_profitProjection"
                align="right"
              />
            </ColumnGroup>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default SalesStatisticsTable;
