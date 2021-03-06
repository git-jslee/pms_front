import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MaintenanceListForm from '../../components/maintenance/MaintenanceListForm';
import InfoMainDrawerForm from '../../components/maintenance/InfoMainDrawerForm';
import { Alert } from 'antd';
import * as api from '../../lib/api/api';
import {
  qs_maintenanceByid,
  qs_mainHistoryByMid,
  qs_mainHistoryAllByMid,
} from '../../lib/api/query';

const Base = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const MaintenanceListCon = () => {
  const { lists, loading } = useSelector(({ apiGetList, loading }) => ({
    lists: apiGetList.datas,
    loading: loading['api/GET_MAINTENANCE'],
  }));
  const [tableData, setTableData] = useState([]);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoData, setInfoData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [totalCost, setTotalCost] = useState({
    ict: [0, 0],
    con: [0, 0],
  });

  useEffect(() => {
    if (!lists) return;

    const calCost = { ict: [0, 0], contents: [0, 0], contracted: 0 };
    let ict_income = 0;
    let ict_expense = 0;
    let con_income = 0;
    let con_expense = 0;

    const data = lists.map((list, index) => {
      // console.log('**list**', list);
      const value = list.attributes;
      const contracted = list.attributes.contracted;
      const team = list.attributes.scode_team.data.id;
      let income = 0;
      let expense = 0;
      const histories = list.attributes.maintenance_histories.data;
      if (histories.length > 0) {
        // 유지보수 서비스 항목 있을경우..
        // console.log('***length*** ===> 0이상');
        const calCost = histories.map((v) => {
          const index = v.attributes.code_ma_inex.data.attributes.code;
          const term = v.attributes.code_ma_term.data.attributes.name;
          const cost = v.attributes.cost;

          // 서비스 기간 검증 기능 추가 필요..서비스 기간내..금액만 계산
          if (index === 'income') {
            if (term === 'annual') income += cost;
            else if (term === 'monthly') income = income + cost * 12;
          }
          if (index === 'expense') {
            if (term === 'annual') expense += cost;
            else if (term === 'monthly') expense = expense + cost * 12;
          }
        });
      }

      // 전체 유지보수 금액 산정용
      // {ict:[매입, 매출], 콘텐츠:[매입, 매출], 미계약: 100 }
      if (team === 1) {
        // 콘텐츠 유지보수
        con_income += income;
        con_expense += expense;
      } else if (team === 2) {
        // ict 유지보수
        ict_income += income;
        ict_expense += expense;
      }

      return {
        key: list.id,
        no: index + 1,
        id: list.id,
        customer: value.customer.data.attributes.name,
        title: value.title,
        scode_item: value.scode_item.data.attributes.name,
        scode_team: value.scode_team.data.attributes.name,
        contracted: value.contracted ? 'YES' : 'NO',
        income: income.toLocaleString('ko-KR'),
        expense: expense.toLocaleString('ko-KR'),
      };
    });
    setTableData(data);
    setTotalCost({
      ict: [ict_income, ict_expense * -1],
      con: [con_income, con_expense * -1],
    });
  }, [lists]);

  const errorOnClose = (e) => {
    console.log(e, 'I was closed.');
  };

  const tblOnClick = async (record) => {
    console.log('*** tbl On cliek ***', record.id);
    // 유지보수 항목 상세 데이터
    // 유지보수 항목에 대한 서비스 기간내 데이터, 유지보수 항목에 대한 전체 데이터..
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
    <Base>
      <MaintenanceListForm
        lists={lists}
        loading={loading}
        tableData={tableData}
        tblOnClick={tblOnClick}
        totalCost={totalCost}
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
    </Base>
  );
};

export default MaintenanceListCon;
