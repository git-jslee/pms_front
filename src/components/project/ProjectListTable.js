import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  Space,
  Spin,
  Row,
  Col,
  Descriptions,
  Badge,
  Dropdown,
  DownOutlined,
  Divider,
} from 'antd';

const ProjectListTable = ({
  tableData,
  loading,
  handleEdit,
  handleIssue,
  onClickDetail,
}) => {
  const navigate = useNavigate();
  console.log('>>>>>>>>>>>>>>>>>data', tableData);
  const expandedRowRender = (record) => {
    if (record.issue_cnt === '') return;
    const columns = [
      {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        align: 'center',
      },
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      },
      // {
      //   title: 'Status',
      //   key: 'status',
      //   dataIndex: 'status',
      // },
      {
        title: 'risk',
        dataIndex: 'risk',
        key: 'risk',
      },
      {
        title: 'date',
        dataIndex: 'issue_date',
        key: 'issue_date',
      },
      // {
      //   title: 'resolution date',
      //   dataIndex: 'resolution_date',
      //   key: 'resolution_date',
      // },
      {
        title: 'momo',
        dataIndex: 'momo',
        key: 'momo',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="small">
            <a>Edit</a>
          </Space>
        ),
      },
    ];
    const data = [];

    for (let i = 0; i < record.issue_cnt; ++i) {
      const arr_issue = record.issue[i];
      data.push({
        key: i.toString(),
        no: i + 1,
        name: arr_issue.attributes.name,
        // status: arr_issue.attributes.status === false ? 'ing' : 'fin',
        risk: arr_issue.attributes.risk,
        issue_date: arr_issue.attributes.issue_date,
        momo: arr_issue.attributes.memo,
      });
    }

    return (
      <>
        <Row>
          <Col span={16}>
            <span>issue</span>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              size="small"
            />
            {/* <span /> */}
          </Col>
          <Col span={8}>
            <span>risk</span>
          </Col>
        </Row>
      </>
    );
  };

  //
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '고객사',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '프로젝트명',
      dataIndex: 'name',
      key: 'name',
    },
    Table.EXPAND_COLUMN,
    {
      title: 'RISK',
      dataIndex: 'risk',
      key: 'risk',
      align: 'center',
      sorter: (a, b) => a.risk - b.risk,
    },
    {
      title: 'ISSUE',
      dataIndex: 'issue_cnt',
      key: 'issue_cnt',
      align: 'center',
    },
    {
      title: '서비스',
      dataIndex: 'service',
      key: 'service',
    },
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
      title: '종료(계획)',
      key: 'plan_enddate',
      dataIndex: 'plan_enddate',
      align: 'center',
    },
    {
      title: '최근작업일',
      key: 'lastUpdate',
      dataIndex: 'lastUpdate',
      align: 'center',
    },
    {
      title: '계획',
      key: 'total_plan',
      dataIndex: 'total_plan',
      align: 'center',
    },
    // {
    //   title: '초과',
    //   key: 'over_day',
    //   dataIndex: 'over_day',
    //   align: 'center',
    // },
    {
      title: '작업',
      key: 'total_work',
      dataIndex: 'total_work',
      align: 'right',
      sorter: (a, b) => a.total_work - b.total_work,
    },
    {
      title: '금액',
      key: 'price',
      dataIndex: 'price',
      align: 'right',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Space size="small">
          {/* <a onClick={() => console.log(record.id)}>Detail</a> */}
          <Button
            onClick={() => onClickDetail(record.id, record.arr_no)}
            size="small"
          >
            view
          </Button>
          {/* <Button size="small">이슈</Button> */}
          <Button
            type="primary"
            disabled={record.code_status === '완료'}
            onClick={() => handleEdit(record)}
            size="small"
          >
            edit
          </Button>
        </Space>
      ),
    },
  ];

  // const onClickDetail = (id) => {
  //   console.log('키..', id);
  //   navigate(`/project/${id}`);
  // };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 20 }}
        expandable={{
          expandedRowRender,
          // defaultExpandedRowKeys: ['0'],
        }}
      />
      {/* {visible ? <ProjectEditForm visible={visible} record={record} /> : ''} */}
      {loading ? <Spin tip="Loading..." /> : ''}
    </>
  );
};

export default ProjectListTable;
