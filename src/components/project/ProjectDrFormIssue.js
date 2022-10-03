import React, { useState } from 'react';
import moment from 'moment';
import {
  Button,
  Drawer,
  Table,
  Row,
  Col,
  Form,
  Select,
  Input,
  DatePicker,
  Switch,
  Checkbox,
  Divider,
  Space,
  InputNumber,
  Empty,
} from 'antd';

const ProjectDrFormIssue = ({
  visible,
  btnDisabled,
  record,
  code_status,
  onClose,
  onSubmit,
  handleCheck,
  checkbox,
}) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Issue Name',
      key: 'issue_name',
      dataIndex: 'issue_name',
    },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'RISK',
      key: 'risk_level',
      dataIndex: 'risk_level',
    },
    {
      title: 'issue date',
      key: 'issue_date',
      dataIndex: 'issue_date',
    },
    {
      title: '해결일',
      key: 'resolution_date',
      dataIndex: 'resolution_date',
    },
    {
      title: '메모',
      key: 'memo',
      dataIndex: 'memo',
    },
  ];

  return (
    <>
      <Drawer
        title={`이슈`}
        width={1000}
        visible={visible}
        onClose={!btnDisabled ? () => onClose(true) : () => onClose(false)}
        extra={
          <Space>
            <Button
              onClick={
                !btnDisabled ? () => onClose(true) : () => onClose(false)
              }
            >
              Cancel
            </Button>
          </Space>
        }
      >
        <Divider />
        <Table columns={columns} dataSource="" />
      </Drawer>
    </>
  );
};

export default ProjectDrFormIssue;
