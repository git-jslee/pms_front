import React from 'react';
import { Table, Tag, Space, Button } from 'antd';

const SalesListTable = () => {
    const columns = [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: '매출확률',
          dataIndex: 'probability',
          key: 'probability',
        },
        {
          title: '매출처',
          dataIndex: 'customer',
          key: 'custmer',
        },
        {
          title: '건명',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '매출구분',
          key: 'division',
          dataIndex: 'division',
        },
        {
            title: '매출품목',
            key: 'item',
            dataIndex: 'item',
          },
          {
            title: '사업부',
            key: 'team',
            dataIndex: 'team',
          },
          {
            title: '매출',
            key: 'sales',
            dataIndex: 'sales',
          },
          {
            title: '매출이익',
            key: 'profit',
            dataIndex: 'profit',
          },
          {
            title: '마진',
            key: 'margine',
            dataIndex: 'margin',
          },
          {
            title: '매출인식일',
            key: 'sales_rec_date',
            dataIndex: 'sales_rec_date',
          },
      ];

      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default SalesListTable;