import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesId } from '../../modules/sales';
import SalesValueUpdateForm from '../../components/sales/SalesValueUpdateForm';
import SalesBasicUpdateForm from '../../components/sales/SalesBasicUpdateForm';
import { changeEditMode } from '../../modules/common';
import moment from 'moment';
import 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import InfoSalesDrawerForm from '../../components/sales/InfoSalesDrawerForm';
import { tbl_insert, tbl_update } from '../../modules/common/tbl_crud';
import { qs_salesBySid } from '../../lib/api/query';
import * as api from '../../lib/api/api';

const { confirm } = Modal;

const InfoSalesDrawerContainer = ({
  infoSalesVisible,
  infoSalesOnClose,
  salesId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState();
  const { customer, codebook } = useSelector(({ codebook, customerList }) => ({
    codebook: codebook.sales,
    customer: customerList.data,
  }));
  const { slist, loading, mode, editmode } = useSelector(
    ({ sales, loading, common }) => ({
      slist: sales.detail,
      loading: loading['sales/GET_SALESID'],
      mode: sales.mode,
      editmode: common.editmode,
    }),
  );
  const [radioValue, setRadioValue] = useState(true);
  const [salesValue, setSalesValue] = useState();
  const [profitMarginValue, setProfitMarginValue] = useState({
    margin: null,
    sales_profit: null,
  });
  const [calResult, setCalResult] = useState({});
  const [checked, setChecked] = useState({
    checked: false,
    name: '매출예정',
  });
  const [editRadioValue, setEditRadioValue] = useState(1);

  const { probability } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
  }));

  console.log('salesid', salesId);

  useEffect(() => {
    const query = qs_salesBySid(salesId);
    dispatch(getSalesId(query));
    // dispatch(getSalesId(salesId));
    //
    // api
    //   .getQueryString('api/sales-statuses', query)
    //   .then((result) => {
    //     console.log('^^result^^', result);
    //   })
    //   .catch((error) => {
    //     console.error('error', error);
    //   });
    //

    dispatch(
      changeEditMode({
        editmode: false,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    console.log('---useEffect 실행---');

    if (!slist) {
      console.log('리턴실행..');
      return;
    }
    const sales_profits = slist.attributes.sales_histories.data;

    const salesProfitData = [];
    const summaryData = {};
    const data = sales_profits.map((list, index) => {
      // 매출, 매출이익, 마진 정보 가져오기, 가장 최근 입력 데이터 가져옴
      const array = {
        key: list.id,
        no: index + 1,
        probability: list.attributes.scode_probability.data.attributes.name,
        // type: list.type,
        confirmed: list.attributes.confirmed ? 'YES' : 'NO',
        sales: list.attributes.sales,
        profit: list.attributes.sales_profit,
        margin: list.attributes.sales_margin,
        sales_rec_date: list.attributes.sales_recdate,
        payment_date: list.attributes.paymentdate,
        description: list.attributes.description,
      };
      console.log('^^^list^^^', list);
      console.log('^^^array^^^', array);
      return array;
    });
    setTableData(data.reverse());
  }, [slist]);

  // 매출이익 마진 계산
  const onChangeRadio = (e) => {
    setRadioValue(e.target.value);
  };
  const salesValueOnchange = (e) => {
    const number = e.target.value;
    console.log('0.salesvalueonchange', number);
    console.log('1.salesvalueonchange', number.replace(/[,]/g, ''));
    setSalesValue(parseInt(e.target.value.replace(/[,]/g, '')));
  };
  const profitMarginOnchange = (e) => {
    console.log('profit&margin_id', e.target.id);
    console.log('profit&margin_value', e.target.value);
    setProfitMarginValue({
      ...profitMarginValue,
      [e.target.id]: parseInt(e.target.value.replace(/[,]/g, '')),
    });
  };

  // 매출이익 마진 계산
  useEffect(() => {
    if (radioValue && salesValue && profitMarginValue) {
      setCalResult({
        margin: (profitMarginValue.sales_profit / salesValue) * 100,
      });
    } else if (!radioValue && salesValue && profitMarginValue) {
      setCalResult({
        profit: salesValue * (profitMarginValue.margin / 100),
      });
      console.log('#salesvslue##', parseInt(salesValue));
      console.log('#1parfitmarginvalue##', profitMarginValue.margin);
      console.log(
        '#2parfitmarginvalue##',
        parseInt(profitMarginValue.margin) / 100,
      );
    } else if (radioValue && salesValue === 0) {
      console.log('--3--', salesValue, profitMarginValue);
      setCalResult({
        margin: 0,
      });
    } else if (!radioValue && salesValue === 0) {
      console.log('--4--', salesValue, profitMarginValue);
      setCalResult({
        profit: 0,
      });
    }
  }, [radioValue, salesValue, profitMarginValue]);

  const editButtonOnClick = () => {
    console.log('edit 버튼 클릭');
    if (editmode === false) {
      const sales_profits = slist.attributes.sales_histories.data;
      console.log('^^^sales_profits^^^', sales_profits);
      const sales_profit = sales_profits[sales_profits.length - 1];
      dispatch(
        changeEditMode({
          editmode: true,
        }),
      );
      setSalesValue(sales_profit.attributes.sales);
      setProfitMarginValue({
        margin: null,
        sales_profit: sales_profit.attributes.sales_profit,
      });
    } else if (editmode === true) {
      dispatch(
        changeEditMode({
          editmode: false,
        }),
      );
    }
  };

  // Edit 버튼 -> 매출 수정, 기본정보 수정 선택
  const editRadioOnChange = (e) => {
    console.log('Radio버튼 선택', e.target.value);
    setEditRadioValue(e.target.value);
  };

  const onClickBack = () => {
    console.log('뒤로가기 버튼 클릭');
    navigate('/sales');
  };

  // 매출항목 매출수정 update 시
  const onSubmit = async (values) => {
    console.log('onSubmit', values);
    let _profit;
    let _margin;
    if (radioValue) {
      _profit = parseInt(profitMarginValue.sales_profit);
      _margin = parseInt(calResult.margin);
    } else {
      _margin = parseInt(profitMarginValue.margin);
      _profit = parseInt(calResult.profit);
    }
    const _confirmed = checked.checked === true ? true : false;
    const _probability = checked.checked === true ? 5 : values.probability;
    // const _sales_recdate = moment(values.sales_rec_date).to
    const update_data = {
      confirmed: _confirmed,
      scode_probability: _probability,
      sales_recdate: moment(values.sales_rec_date)
        .format('YYYY-MM-DD')
        .toString(),
      count: slist.attributes.sales_histories.data.length + 1,
      // description: values.description,
    };
    const result = await tbl_update(
      'api/sales-statuses',
      slist.id,
      update_data,
    );
    console.log('========1. api/sales-statuses_update', update_data);
    // probability 5 -> 100% 의미함
    const paymentDate = values.payment_date || '';
    const payment_data = {
      sales_status: slist.id,
      confirmed: _confirmed,
      scode_probability: _probability,
      sales: values.sales,
      sales_profit: _profit,
      sales_margin: _margin,
      sales_recdate: moment(values.sales_rec_date)
        .format('YYYY-MM-DD')
        .toString(),
      paymentdate: moment(paymentDate).tz('Asia/Seoul'),
      description: values.memo,
    };
    const result2 = await tbl_insert('api/sales-histories', payment_data);
    console.log('========2. api/sales-histories', payment_data, result2);
    //
    const query = qs_salesBySid(slist.id);
    dispatch(getSalesId(query));
    dispatch(
      changeEditMode({
        editmode: false,
      }),
    );
    // navigate(`/sales/${id}`);
  };

  // 매출항목 기본정보 update 시
  const onSubmitBasic = async (values) => {
    console.log('onSubmitBasic', values);
    const basic_data = {
      name: values.sales_name,
      customer: values.customer,
      scode_division: values.division,
      scode_item: values.item,
      scode_team: values.team,
      description: values.description,
    };
    const result = await tbl_update('api/sales-statuses', slist.id, basic_data);
    console.log('1. api/sales-statuses_update', result.data);

    const query = qs_salesBySid(slist.id);
    dispatch(getSalesId(query));
    dispatch(
      changeEditMode({
        editmode: false,
      }),
    );
    // navigate(`/sales/${id}`);
  };

  const onChangeSwitch = (e) => {
    console.log('스위치button', e);
    if (e) {
      const value = {
        checked: true,
        name: '매출확정',
      };
      setChecked(value);
    } else {
      const value = {
        checked: false,
        name: '매출예정',
      };
      setChecked(value);
    }
  };
  console.log('ckecked', checked);
  console.log('probability', probability);
  console.log('salesValue', salesValue);
  console.log('profitMarginValue', profitMarginValue);

  const updateForm = () => {
    const sales_profits = slist.attributes.sales_histories.data;
    console.log('^^^sales_profits^^^', sales_profits);
    const sales_profit = sales_profits[sales_profits.length - 1];
    const _payment_date = sales_profit.attributes.paymentdate
      ? moment(sales_profit.attributes.paymentdate)
      : '';
    console.log('^^^_payment_date^^^', _payment_date);
    const initialValues = {
      // SalesBasicUpdateForm
      sales_name: slist.attributes.name,
      customer: slist.attributes.customer.data.id,
      division: slist.attributes.scode_division.data.id,
      item: slist.attributes.scode_item.data.id,
      team: slist.attributes.scode_team.data.id,
      description: slist.attributes.description,
      //SalesValueUpateForm
      confirmed: sales_profit.attributes.confirmed,
      sales: sales_profit.attributes.sales,
      sales_profit: sales_profit.attributes.sales_profit,
      probability: sales_profit.attributes.scode_probability.data.id,
      sales_rec_date: moment(sales_profit.attributes.sales_recdate),
      payment_date: _payment_date,
    };
    // setSalesValue(sales_profit.sales);

    return (
      <>
        {editRadioValue === 1 ? (
          <>
            <SalesValueUpdateForm
              initialValues={initialValues}
              slist={slist.data}
              tableData={tableData}
              probability={probability}
              profitMarginValue={profitMarginValue}
              radioValue={radioValue}
              calResult={calResult}
              onSubmit={onSubmit}
              onChangeRadio={onChangeRadio}
              salesValueOnchange={salesValueOnchange}
              profitMarginOnchange={profitMarginOnchange}
              checked={checked}
              onChangeSwitch={onChangeSwitch}
            />
          </>
        ) : (
          <SalesBasicUpdateForm
            initialValues={initialValues}
            customer={customer}
            codebook={codebook}
            onSubmitBasic={onSubmitBasic}
          />
        )}
      </>
    );
  };

  // 항목 삭제 기능
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this item?',
      // icon: <ExclamationCircleOutlined />,
      content: `[매출처 : ${slist.attributes.customer.data.attributes.name}], [건명 : ${slist.attributes.name}]`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        console.log('매출항목 삭제', slist.id);
        // const jwt = auth.jwt;
        const delete_data = {
          deleted: true,
        };
        const result = await tbl_update(
          'api/sales-statuses',
          slist.id,
          delete_data,
        );
        console.log('항목삭제 성공', result);
        navigate('/sales');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // const onClickItemDelete = async () => {
  //   console.log('매출항목 삭제', slist.id);
  //   // const jwt = auth.jwt;

  //   const delete_data = {
  //     deleted: true,
  //   };
  //   const result = await tbl_update(
  //     'sales-performances',
  //     slist.id,
  //     delete_data,
  //   );
  //   console.log('항목삭제 성공', result);
  //   navigate('/sales');
  // };

  console.log('slist', slist);
  console.log('2.infoSalesVisible', infoSalesVisible);

  return (
    <>
      {slist && probability ? (
        !editmode ? (
          <InfoSalesDrawerForm
            slist={slist}
            tableData={tableData}
            editButtonOnClick={editButtonOnClick}
            editRadioOnChange={editRadioOnChange}
            editRadioValue={editRadioValue}
            editmode={editmode}
            // updateForm={updateForm()}
            onClickBack={onClickBack}
            showDeleteConfirm={showDeleteConfirm}
            infoSalesVisible={infoSalesVisible}
            infoSalesOnClose={infoSalesOnClose}
          />
        ) : (
          <InfoSalesDrawerForm
            slist={slist}
            tableData={tableData}
            editButtonOnClick={editButtonOnClick}
            editRadioOnChange={editRadioOnChange}
            editRadioValue={editRadioValue}
            editmode={editmode}
            updateForm={updateForm()}
            onClickBack={onClickBack}
            infoSalesVisible={infoSalesVisible}
            infoSalesOnClose={infoSalesOnClose}
          />
        )
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default InfoSalesDrawerContainer;
