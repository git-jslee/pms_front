import { Table, Space } from 'antd';
import { LinkOutlined, EditOutlined } from '@ant-design/icons';

export const columns_review = [
  {
    title: 'ID',
    key: 'key',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '입력구분',
    key: 'type_input',
    dataIndex: 'type_input',
    align: 'center',
  },
  {
    title: '공고기관',
    dataIndex: 'type_orgcode',
    key: 'type_orgcode',
    align: 'center',
  },
  Table.EXPAND_COLUMN,
  {
    title: '공고명',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '검토일',
    key: 'review_date',
    dataIndex: 'review_date',
    align: 'center',
  },
  {
    title: '검토결과',
    key: 'review_result',
    dataIndex: 'review_result',
    align: 'center',
  },
  {
    title: '검토자',
    key: 'review_user',
    dataIndex: 'review_user',
    align: 'center',
  },
  {
    title: '등록일',
    key: 'reg_date',
    dataIndex: 'reg_date',
  },
  {
    title: '접수기간',
    key: 'period',
    dataIndex: 'period',
  },
  {
    title: 'ACTION',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
        {/* <InfoCircleOutlined
            onClick={() => {
              actionOnClick(record.key);
            }}
            style={{ fontSize: '20px' }}
          /> */}
        <LinkOutlined
          onClick={() => {
            //   infoSalesOnClick(record.key);
          }}
          style={{ fontSize: '20px' }}
        />
        <Space size="small">
          <EditOutlined
            onClick={() => {
              //   infoSalesOnClick(record.key);
            }}
            style={{ fontSize: '20px' }}
          />
        </Space>
      </Space>
    ),
  },
];

export const columns_check = [
  {
    title: 'ID',
    key: 'key',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '공고기관',
    dataIndex: 'type_orgcode',
    key: 'type_orgcode',
    align: 'center',
  },
  {
    title: 'no',
    dataIndex: 'org_no',
    key: 'org_no',
    align: 'center',
  },
  Table.EXPAND_COLUMN,
  {
    title: '공고명',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '확인일',
    key: 'check_date',
    dataIndex: 'check_date',
    align: 'center',
  },
  {
    title: '확인결과',
    key: 'check_result',
    dataIndex: 'check_result',
    align: 'center',
  },
  {
    title: '등록일',
    key: 'reg_date',
    dataIndex: 'reg_date',
  },
  {
    title: '접수기간',
    key: 'period',
    dataIndex: 'period',
  },
  //   {
  //     title: 'ACTION',
  //     key: 'action',
  //     render: (text, record) => (
  //       <Space size="small">
  //         {/* <InfoCircleOutlined
  //             onClick={() => {
  //               actionOnClick(record.key);
  //             }}
  //             style={{ fontSize: '20px' }}
  //           /> */}
  //         <LinkOutlined
  //           onClick={() => {
  //             //   infoSalesOnClick(record.key);
  //           }}
  //           style={{ fontSize: '20px' }}
  //         />
  //         <Space size="small">
  //           <EditOutlined
  //             onClick={() => {
  //               //   infoSalesOnClick(record.key);
  //             }}
  //             style={{ fontSize: '20px' }}
  //           />
  //         </Space>
  //       </Space>
  //     ),
  //   },
];
