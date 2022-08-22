import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Space, Spin, Row, Col, Descriptions } from 'antd';
import ProjectEditForm from './ProjectEditForm';

const ProjectListTable = ({
  tableData,
  loading,
  handleEdit,
  handleSearch1,
}) => {
  // const [visible, setVisible] = useState(false);
  // const [record, setRecord] = useState();
  const navigate = useNavigate();
  console.log('>>>>>>>>>>>>>>>>>data', tableData);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    // {
    //   title: '계약',
    //   dataIndex: 'contracted',
    //   key: 'contracted',
    // },
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
    // {
    //   title: '사업부',
    //   key: 'team',
    //   dataIndex: 'team',
    //   align: 'center',
    // },
    // {
    //   title: '상태',
    //   key: 'code_status',
    //   dataIndex: 'code_status',
    //   align: 'center',
    // },
    {
      title: '진행률',
      key: 'project_progress',
      dataIndex: 'project_progress',
      align: 'center',
    },
    {
      title: '시작',
      key: 'startdate',
      dataIndex: 'startdate',
      align: 'center',
    },
    {
      title: '경과',
      key: 'elapsed',
      dataIndex: 'elapsed',
      align: 'right',
      // sorter: (a, b) => a.elapsed - b.elapsed,
    },
    {
      title: '최근작업일',
      key: 'lastUpdate',
      dataIndex: 'lastUpdate',
      align: 'center',
    },
    {
      title: '경과',
      key: 'elapsed_last',
      dataIndex: 'elapsed_last',
      align: 'right',
      // sorter: (a, b) => a.elapsed_last - b.elapsed_last,
    },
    {
      title: '종료(계획)',
      key: 'plan_enddate',
      dataIndex: 'plan_enddate',
      align: 'center',
    },
    // {
    //   title: '기준(일)',
    //   key: 'base_day',
    //   dataIndex: 'base_day',
    //   align: 'right',
    // },
    {
      title: '계획',
      key: 'total_plan',
      dataIndex: 'total_plan',
      align: 'center',
    },
    {
      title: '초과',
      key: 'over_day',
      dataIndex: 'over_day',
      align: 'center',
    },
    // {
    //   title: '초과(일)',
    //   key: 'over_day',
    //   dataIndex: 'over_day',
    //   align: 'right',
    // },
    {
      title: '작업',
      key: 'total_work',
      dataIndex: 'total_work',
      align: 'right',
      sorter: (a, b) => a.total_work - b.total_work,
    },
    {
      title: '잔여',
      key: 'remaining_day',
      dataIndex: 'remaining_day',
      align: 'right',
      sorter: (a, b) => a.remaining_day - b.remaining_day,
    },
    // {
    //   title: '시작일',
    //   key: 'startdate',
    //   dataIndex: 'startdate',
    //   align: 'right',
    // },

    {
      title: '금액',
      key: 'price',
      dataIndex: 'price',
      align: 'right',
    },
  ];

  const onClick1 = (id) => {
    console.log('키..', id);
    // project..view..코드 작성
    navigate(`/projects/${id}`);
  };

  const onClick = (id) => {
    console.log('키..', id);
    // project..view..코드 작성
    navigate(`/project/${id}`);
  };

  // const handleEdit = (record) => {
  //   //
  //   console.log('****record****', record);
  //   setRecord(record);
  //   setVisible(true);
  // };

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
                      <Button onClick={() => onClick(record.id)}>상세</Button>
                      <Button
                        type="primary"
                        disabled={record.code_status === '완료'}
                        onClick={() => handleEdit(record)}
                      >
                        수정
                      </Button>
                    </>
                  }
                >
                  <Descriptions.Item label="계약여부">
                    {`${record.contracted}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="계획(시작/종료)">
                    {`${record.plan_startdate} / ${record.plan_enddate}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Date">
                    {` ${record.startdate} / (${record.elapsed}일 경과)`}
                  </Descriptions.Item>
                  <Descriptions.Item label="상태">
                    {record.code_status}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="실행(시작/종료)">
                    {`${record.startdate} / ${record.enddate}`}
                  </Descriptions.Item> */}
                  <Descriptions.Item label="일정계획">
                    {`기준-${record.base_day}일 / 초과-${record.over_day}일`}
                  </Descriptions.Item>
                  <Descriptions.Item label="최근작업일">
                    {`${record.lastUpdate} / (${record.elapsed_last}일 경과)`}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="금액">
                    {record.price}
                  </Descriptions.Item> */}
                  <Descriptions.Item label="비 고" span={3}>
                    {record.description}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          ),
        }}
      />
      {/* {visible ? <ProjectEditForm visible={visible} record={record} /> : ''} */}
      {loading ? <Spin tip="Loading..." /> : ''}
    </>
  );
};

export default ProjectListTable;
