import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MaintenanceListForm from '../../components/maintenance/MaintenanceListForm';
import InfoMainDrawerForm from '../../components/maintenance/InfoMainDrawerForm';
import { Alert } from 'antd';
import * as api from '../../lib/api/api';
import {
  qs_maintenanceByid,
  qs_mainHistoryByMid,
  qs_mainHistoryAllByMid,
} from '../../lib/api/query';

const MaintenanceListCon = () => {
  const { lists, loading } = useSelector(({ apiGetList, loading }) => ({
    lists: apiGetList.datas,
    loading: loading['api/GET_MAINTENANCE'],
  }));
  const [tableData, setTableData] = useState([]);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoData, setInfoData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (!lists) return;

    const data = lists.map((list, index) => {
      // console.log('**list**', list);
      const value = list.attributes;
      return {
        no: index + 1,
        id: list.id,
        customer: value.customer.data.attributes.name,
        title: value.title,
        scode_item: value.scode_item.data.attributes.name,
        scode_team: value.scode_team.data.attributes.name,
        contracted: value.contracted ? 'YES' : 'NO',
      };
    });
    setTableData(data);
  }, [lists]);

  const errorOnClose = (e) => {
    console.log(e, 'I was closed.');
  };

  const tblOnClick = async (record) => {
    console.log('*** tbl On cliek ***', record.id);
    // 유지보수 항목 상세 데이터
    const query_main = qs_maintenanceByid(record.id);
    const query_history = qs_mainHistoryByMid(record.id);
    const query_history_all = qs_mainHistoryAllByMid(record.id);
    try {
      const req_main = await api.getQueryString('api/maintenances', query_main);
      const req_history = await api.getQueryString(
        'api/maintenance-histories',
        query_history,
      );
      const req_history_all = await api.getQueryString(
        'api/maintenance-histories',
        query_history_all,
      );
      const main_data = { id: record.id, ...req_main.data.data[0].attributes };
      console.log('***req_history***', req_history.data.data);

      setHistoryData([req_history_all.data.data, req_history.data.data]);
      setInfoData(main_data);
      setInfoVisible(true);
    } catch (e) {
      console.log('****error****', e);
      // return (
      //   <Alert
      //     message="에러 발생 - 관리자에게 문의 바랍니다."
      //     type="warning"
      //     closable
      //     onClose={errorOnClose}
      //   />
      // );
    }
  };

  // InfoMaintenance Drawer - OnClose
  const onCloseDrawer = () => {
    setInfoVisible(false);
  };

  return (
    <>
      <MaintenanceListForm
        lists={lists}
        loading={loading}
        tableData={tableData}
        tblOnClick={tblOnClick}
      />
      {infoVisible && infoData ? (
        <InfoMainDrawerForm
          infoVisible={infoVisible}
          onCloseDrawer={onCloseDrawer}
          infoData={infoData}
          historyData={historyData}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default MaintenanceListCon;
