import React from 'react';
import {
  Table,
  Descriptions,
  Badge,
  Space,
  Divider,
  Button,
  Col,
  Row,
  Radio,
  Popconfirm,
  Drawer,
} from 'antd';

const InfoMainDrawerForm = ({
  infoVisible,
  onCloseDrawer,
  infoData,
  historyData,
}) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '구분',
      key: 'code_ma_inex',
      dataIndex: 'code_ma_inex',
    },
    {
      title: '서비스 명',
      key: 'code_ma_item',
      dataIndex: 'code_ma_item',
    },
    {
      title: '서비스 시작',
      key: 'warranty_from',
      dataIndex: 'warranty_from',
    },
    {
      title: '서비스 종료',
      key: 'warranty_to',
      dataIndex: 'warranty_to',
    },
    {
      title: '결제 주기',
      key: 'code_ma_term',
      dataIndex: 'code_ma_term',
    },
    {
      title: '금액',
      key: 'cost',
      dataIndex: 'cost',
    },
    {
      title: '금액(월)',
      key: 'cost_m',
      dataIndex: 'cost_m',
    },
    {
      title: '메모',
      key: 'memo',
      dataIndex: 'memo',
    },
  ];

  let cost_income = 0;
  let cost_expense = 0;
  let warranty_from = '';
  let warranty_to = '';

  // 서비스 리스트
  const tableData = historyData
    ? historyData[0].map((list, index) => {
        console.log('***list***', list);
        const data = list.attributes;
        return {
          no: index + 1,
          code_ma_inex: data.code_ma_inex.data.attributes.name,
          code_ma_item: data.code_ma_item.data.attributes.name,
          warranty_from: data.warranty_from,
          warranty_to: data.warranty_to,
          code_ma_term: data.code_ma_term.data.attributes.name,
          cost: data.cost.toLocaleString('ko-KR'),
          cost_m: data.cost_m.toLocaleString('ko-KR'),
          memo: data.memo,
        };
      })
    : '';

  // 전체 매출이익(월), 매출, 매입 계산용
  const costData = historyData
    ? historyData[1].map((list, index) => {
        console.log('***list***', list);
        const data = list.attributes;
        if (data.code_ma_inex.data.id === 1) {
          warranty_from = data.warranty_from;
          warranty_to = data.warranty_to;
          if (data.code_ma_term.data.id === 1) cost_income += data.cost;
          else cost_income += data.cost * 12;
        } else if (data.code_ma_inex.data.id === 2) {
          if (data.code_ma_term.data.id === 1) cost_expense += data.cost;
          else cost_expense += data.cost * 12;
        }
      })
    : '';

  return (
    <>
      <Drawer
        title="유지보수 항목 상세 보기"
        width={1000}
        onClose={onCloseDrawer}
        visible={infoVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClose={onCloseDrawer}>Cancel</Button>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Space>
        }
      >
        <Descriptions
          title={`${infoData.customer.data.attributes.name} - ${infoData.title}`}
          bordered
        >
          <Descriptions.Item label="ID">{infoData.id}</Descriptions.Item>
          <Descriptions.Item label="고객사">
            {infoData.customer.data.attributes.name}
          </Descriptions.Item>
          <Descriptions.Item label="품목">
            {infoData.scode_item.data.attributes.name}
          </Descriptions.Item>
          <Descriptions.Item label="건 명" span={2}>
            {infoData.title}
          </Descriptions.Item>
          <Descriptions.Item label="사업부">
            {infoData.scode_team.data.attributes.name}
          </Descriptions.Item>
          <Descriptions.Item label="계약여부">
            {infoData.contracted ? 'YES' : 'NO'}
          </Descriptions.Item>
          <Descriptions.Item label="유지보수(시작)">
            {warranty_from}
          </Descriptions.Item>
          <Descriptions.Item label="유지보수(종료)">
            {warranty_to}
          </Descriptions.Item>
          <Descriptions.Item label="매출이익(월)">
            {Math.round((cost_income + cost_expense) / 12).toLocaleString(
              'ko-KR',
            )}
          </Descriptions.Item>
          <Descriptions.Item label="매출(년)">
            {cost_income.toLocaleString('ko-KR')}
          </Descriptions.Item>
          <Descriptions.Item label="매입(년)">
            {cost_expense.toLocaleString('ko-KR')}
          </Descriptions.Item>
          <Descriptions.Item label="비고" span={3}>
            {infoData.description}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <Table columns={columns} dataSource={tableData ? tableData : ''} />
      </Drawer>
    </>
  );
};

export default InfoMainDrawerForm;
