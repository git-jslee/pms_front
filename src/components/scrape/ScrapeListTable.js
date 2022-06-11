import React, { useState } from 'react';
import {
  Form,
  Table,
  Button,
  Space,
  Descriptions,
  Row,
  Col,
  Input,
} from 'antd';
import ScrapeDrawerForm from './ScrapeDrawerForm';

const ScrapeListTable = ({ scrape, codebook, columns, dataSource }) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState();
  //   let dataSource;
  //   if (!scrape) {
  //     dataSource = [];
  //   } else if (scrape) {
  //     //
  //     console.log('**scrape**', scrape);
  //     const arr = scrape.map((list, index) => {
  //       const sdata = list.attributes;
  //       const _review_result = sdata.review_result.data
  //         ? sdata.review_result.data.attributes.name
  //         : null;
  //       const _attachment = sdata.attachment.data
  //         ? sdata.attachment.data[0].attributes
  //         : '';
  //       const returnData = {
  //         key: list.id,
  //         type_orgcode: sdata.type_orgname.data.attributes.code,
  //         type_orgname: sdata.type_orgname.data.attributes.name,
  //         title: sdata.title,
  //         review_date: sdata.review_date,
  //         review_opnion: sdata.review_opnion,
  //         type_input: sdata.type_input.data.attributes.name,
  //         review_result: _review_result,
  //         attachment_name: _attachment ? _attachment.name : '',
  //         description: 'test',
  //       };
  //       return returnData;
  //     });
  //     dataSource = arr;
  //   }

  const reviewOnclick = (record) => {
    console.log('**e**', record);
    setRecord(record);
    setVisible(true);
  };

  const onClose = () => {
    setRecord();
    setVisible(false);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => (
            <Row>
              <Col span={visible ? 16 : 24}>
                <Descriptions
                  title={record.type_orgname}
                  extra={
                    !record.review_result ? (
                      <Button
                        type="primary"
                        onClick={() => reviewOnclick(record)}
                      >
                        검토결과 등록
                      </Button>
                    ) : (
                      ''
                    )
                  }
                >
                  <Descriptions.Item label="검토의견" span={3}>
                    {record.review_opnion}
                  </Descriptions.Item>
                  <Descriptions.Item label="첨부파일" span={3}>
                    {record.attachment_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="비 고">
                    {record.description}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          ),
        }}
        pagination={{ pageSize: 20 }}
      />
      {visible ? (
        <ScrapeDrawerForm
          visible={visible}
          codebook={codebook}
          record={record}
          onClose={onClose}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ScrapeListTable;
