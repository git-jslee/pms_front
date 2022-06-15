import React, { useState } from 'react';
import { Button, Table, Space, Spin, Row, Col, Descriptions } from 'antd';
import ProjectEditForm from './ProjectEditForm';

const ProjectListTable = ({ tableData, loading }) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '계약',
      dataIndex: 'contracted',
      key: 'contracted',
    },
    {
      title: '고객사',
      dataIndex: 'customer',
      key: 'customer',
    },
    Table.EXPAND_COLUMN,
    {
      title: '프로젝트명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '서비스',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: '사업부',
      key: 'team',
      dataIndex: 'team',
      align: 'center',
    },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: '시작일',
      key: 'startdate',
      dataIndex: 'startdate',
      align: 'right',
    },
    {
      title: '(start)',
      key: 'elapsed',
      dataIndex: 'elapsed',
      align: 'right',
      sorter: (a, b) => a.elapsed - b.elapsed,
    },
    // {
    //   title: '최근작업일',
    //   key: 'lastUpdate',
    //   dataIndex: 'lastUpdate',
    //   align: 'center',
    // },
    {
      title: '(update)',
      key: 'elapsed_last',
      dataIndex: 'elapsed_last',
      align: 'right',
      sorter: (a, b) => a.elapsed_last - b.elapsed_last,
    },
    {
      title: '투입(일)',
      key: 'totalday',
      dataIndex: 'totalday',
      align: 'center',
      sorter: (a, b) => a.totalday - b.totalday,
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   align: 'center',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button
    //         onClick={() => {
    //           onClick(record.key);
    //         }}
    //       >
    //         View
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  const onClick = (id) => {
    console.log('키..', id);
    // project..view..코드 작성
    // navigate(`/project/${id}`);
  };

  const handleEdit = (record) => {
    //
    console.log('****record****', record);
    setRecord(record);
    setVisible(true);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 20 }}
        expandable={{
          expandedRowRender: (record) => (
            <Row>
              <Col span={24}>
                <Descriptions
                  title={record.name}
                  bordered
                  column={3}
                  labelStyle={{ backgroundColor: '#d6e4ff' }}
                  contentStyle={{ backgroundColor: '#f0f5ff' }}
                  extra={
                    <>
                      <Button>상세조회</Button>
                      <Button
                        type="primary"
                        disabled={record.status === '완료'}
                        onClick={() => handleEdit(record)}
                      >
                        수정
                      </Button>
                    </>
                  }
                >
                  <Descriptions.Item label="계획(시작/종료)">
                    {`${record.plan_startdate} / ${record.plan_enddate}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Date">
                    {` ${record.startdate} / (${record.elapsed}일 경과)`}
                  </Descriptions.Item>
                  <Descriptions.Item label="계약여부">
                    {record.contracted}
                  </Descriptions.Item>
                  <Descriptions.Item label="실행(시작/종료)">
                    {`${record.startdate} / ${record.enddate}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Update Date">
                    {`${record.lastUpdate} / (${record.elapsed_last}일 경과)`}
                  </Descriptions.Item>
                  <Descriptions.Item label="금액">
                    {record.price}
                  </Descriptions.Item>
                  <Descriptions.Item label="비 고" span={3}>
                    {record.description}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          ),
        }}
      />
      {visible ? <ProjectEditForm visible={visible} record={record} /> : ''}
      {loading ? <Spin tip="Loading..." /> : ''}
    </>
  );
};

export default ProjectListTable;
