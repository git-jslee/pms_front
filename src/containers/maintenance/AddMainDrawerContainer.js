import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import { tbl_insert, tbl_update } from '../../modules/common/tbl_crud';
import AddMainDrawerForm from '../../components/maintenance/AddMainDrawerForm';
import { getCustomerlist } from '../../modules/customerList';
import customerSortDuplicate from '../../modules/common/customerSortDuplicate';
import { qs_customerByUsed, qs_maintenanceByCid } from '../../lib/api/query';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const AddMainDrawerContainer = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { customer } = useSelector(({ customerList }) => ({
    customer: customerList.data,
  }));
  const [formReset, setFormReset] = useState(0);
  const [item, setItem] = useState();
  const [team, setTeam] = useState();
  const [provider, setProvider] = useState();
  const [term, setTerm] = useState();
  const [maitem, setMaitem] = useState();
  const [filterMaItem, setFilterMaItem] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [filterMain, setFilterMain] = useState([]);
  const [btnIncome, setBtnIncome] = useState(true);
  // 유지보수 Form 에서 '서비스 추가' 버튼 클릭시
  const [btnService, setBtnService] = useState(false);

  useEffect(() => {
    // 고객정보 reduxt 가져오기
    if (!customer) {
      dispatch(getCustomerlist());
    }

    // 유지보수 item 정보 가져오기
    const query = 'filters[maintenance][$eq]=true';
    api
      .getListQuery('api/scode-items', query)
      .then((result) => {
        console.log('result', result.data.data);
        setItem(result.data.data);
      })
      .catch((error) => console.log('error', error));

    // 사업부 정보 가져오기
    api
      .getList('api/scode-teams?populate=%2A')
      .then((result) => {
        console.log('tesm-result', result.data.data);
        setTeam(result.data.data);
      })
      .catch((error) => console.log('error', error));

    // 서비스 제공자 정보 가져오기
    api
      .getList('api/code-ma-providers?populate=%2A')
      .then((result) => {
        console.log('code-ma-providers', result.data.data);
        setProvider(result.data.data);
      })
      .catch((error) => console.log('error', error));

    //Term 정보 가져오기
    api
      .getList('api/code-ma-terms?populate=%2A')
      .then((result) => {
        console.log('code-ma-terms', result.data.data);
        setTerm(result.data.data);
      })
      .catch((error) => console.log('error', error));

    // 서비스 아이템 정보 가져오기
    api
      .getList('api/code-ma-items?populate=%2A')
      .then((result) => {
        console.log('code-ma-items', result.data.data);
        setMaitem(result.data.data);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    // 유지보수 등록 고객사 정보 가져오기
    if (!btnService) return;
    const path = 'api/maintenances';
    const arg = {
      used: {
        $eq: true,
      },
    };
    const query = qs_customerByUsed(arg);

    // 유지보수 사용중 & Filter & 중복제거 & 오름차순 정렬
    const request = customerSortDuplicate(path, query)
      .then((result) => {
        console.log('***', result);
        setFilterCustomer(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [btnService]);

  const onClose = () => {
    setVisible(false);
  };

  // DrawerForm 에서 '서비스 추가' 버튼 클릭
  const onChangeAddContract = () => {
    if (btnService === true) {
      // 버튼클릭시 폼 초기화 기능 구현 추가 필요
      //
      // code_ma_item
      setFilterMaItem([]);
      setBtnService(false);
      setFormReset(formReset + 1);
    } else if (btnService === false) {
      console.log('**ma_item**', maitem);
      const result = maitem.filter((v) => {
        return v.attributes.code_ma_inex.data.id === 1;
      });
      console.log('**ma_item_result**', result);
      setFilterMaItem(result);
      setBtnService(true);
      setFormReset(formReset + 1);
    }
  };

  // 서비스 추가 > 고객사 선택시
  const onChangeCustomer = async (cid) => {
    console.log('***', cid);
    // 1. 선택 고객사에 해당하는 유지보수 정보 가져오기
    const query = qs_maintenanceByCid(cid);
    const request = await api.getQueryString('api/maintenances', query);
    console.log('***', request.data.data);
    setFilterMain(request.data.data);
  };

  // 수입/지출 버튼 선택시..
  const onClickIncome = (e) => {
    // 지출
    // console.log('***', e.target.value);
    if (e.target.value === 'expenditure') {
      // setFormReset(formReset + 1);
      // const request = filterMaintenanceItem(2);
      setFilterMaItem([]);
      setFormReset(formReset + 1);
      setBtnIncome(false);
    } else if (e.target.value === 'income') {
      // 소득, 매출
      const request = filterMaintenanceItem(1);
      setFilterMaItem(request);
      setFormReset(formReset + 1);
      setBtnIncome(true);
    }
  };

  // 서비스 제공자 선택시
  const OnChangeProvider = (e) => {
    //
    console.log('**서비스 제공자**', e);
    const request = filterMaintenanceItem(2, e);
    console.log('**ma_item_result**', request);
    setFilterMaItem(request);
  };

  // 수입 지출 선택시..ma_item
  const filterMaintenanceItem = (id, pid) => {
    const result = maitem.filter((v) => {
      if (id === 1) return v.attributes.code_ma_inex.data.id === 1;
      else if (id === 2) {
        return v.attributes.code_ma_provider.data.id === pid;
      }
    });
    console.log('**ma_item_result**', result);
    return result;
  };

  // onSubmit
  const onSubmit = async (value) => {
    // 유지보수 등록
    if (!btnService) {
      const create_data = {
        ...value,
        contracted:
          value.contracted === undefined || value.contracted === false
            ? false
            : true,
      };
      console.log('create_data', value);
      const result = await tbl_insert('api/maintenances', create_data);
      console.log('1. maintenances', result.data);
    }
    // 유지보수 수입/지출 등록
    else if (btnService) {
      if (btnIncome) {
        // 유지보수 수입 등록
        console.log('**onSubmit-수입**', value);
        const cost = value.code_ma_term === 1 ? value.cost / 12 : value.cost;
        const create_data = {
          code_ma_inex: 1,
          maintenance: value.maintenance,
          code_ma_item: value.code_ma_item,
          code_ma_term: value.code_ma_term,
          warranty_from: value.service_date[0],
          warranty_to: value.service_date[1],
          payment_date: value.payment_date,
          cost: value.cost,
          cost_m: Math.round(cost),
          memo: value.memo,
        };
        console.log('create_data', create_data);
        const result = await tbl_insert(
          'api/maintenance-histories',
          create_data,
        );
        console.log('1. maintenance-histories', result.data);
        setFormReset(formReset + 1);
        setVisible(false);
      } else if (!btnIncome) {
        // 유지보수 지출 등록
        console.log('**onSubmit-지출**', value);
        const cost = value.code_ma_term === 1 ? value.cost / 12 : value.cost;
        const create_data = {
          code_ma_inex: 2,
          maintenance: value.maintenance,
          code_ma_item: value.code_ma_item,
          code_ma_term: value.code_ma_term,
          warranty_from: value.service_date[0],
          warranty_to: value.service_date[1],
          payment_date: value.payment_date,
          cost: value.cost * -1,
          cost_m: Math.round(cost * -1),
          memo: value.memo,
        };
        console.log('create_data', create_data);
        const result = await tbl_insert(
          'api/maintenance-histories',
          create_data,
        );
        console.log('1. maintenance-histories', result.data);
        setFormReset(formReset + 1);
        setVisible(false);
      }
    }
  };

  return (
    <>
      <AddMainDrawerForm
        onSubmit={onSubmit}
        formReset={formReset}
        visible={visible}
        onClose={onClose}
        customer={customer}
        filterCustomer={filterCustomer}
        filterMain={filterMain}
        item={item}
        team={team}
        provider={provider}
        term={term}
        filterMaItem={filterMaItem}
        btnService={btnService}
        onChangeAddContract={onChangeAddContract}
        onChangeCustomer={onChangeCustomer}
        onClickIncome={onClickIncome}
        OnChangeProvider={OnChangeProvider}
        btnIncome={btnIncome}
        //
      />
    </>
  );
};

export default AddMainDrawerContainer;
