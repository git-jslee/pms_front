import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MaintenanceListForm from '../../components/maintenance/MaintenanceListForm';

const MaintenanceListCon = () => {
  const { lists, loading } = useSelector(({ apiGetList, loading }) => ({
    lists: apiGetList.datas,
    loading: loading['api/GET_MAINTENANCE'],
  }));
  const [tableData, setTableData] = useState([]);

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

  const tblOnClick = (record) => {
    console.log('*** tbl On cliek ***', record.id);
  };

  return (
    <>
      <MaintenanceListForm
        lists={lists}
        loading={loading}
        tableData={tableData}
        tblOnClick={tblOnClick}
      />
    </>
  );
};

export default MaintenanceListCon;
