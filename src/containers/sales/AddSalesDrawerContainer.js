import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddSalesDrawerForm from '../../components/sales/AddSalesDrawerForm';
// import tbl_insert from '../../modules/tbl_insert';
import { tbl_insert } from '../../modules/common/tbl_crud';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const AddSalesDrawerContainer = ({
  addSalesVisible,
  setAddSalesVisible,
  addSalesOnClose,
  initialValues,
  salesConfirmed,
}) => {
  console.log('--2.salesConfirmed--', salesConfirmed);
  const navigate = useNavigate();
  //웹토큰 가져오기..값 변경시에만 실행되게 설정 변경..
  // const { auth } = useSelector(({ auth }) => ({
  //   auth: auth.auth,
  // }));
  const { customer, codebook } = useSelector(({ codebook, customerList }) => ({
    codebook: codebook.sales,
    customer: customerList.data,
  }));
  // 중복Submit 방지
  const [btnDisabled, setBtnDisabled] = useState(false);

  const { customerid } = useSelector(({ common }) => ({
    customerid: common.customerid,
  }));

  const [divisionId, setDivisionId] = useState(null);
  const [radioValue, setRadioValue] = useState(true);
  const [salesValue, setSalesValue] = useState(initialValues.sales);
  const [probabilityChecked, setProbabilityChecked] = useState({
    checked: false,
    name: '매출예정',
  });
  const [profitMarginValue, setProfitMarginValue] = useState({
    margin: null,
    sales_profit: initialValues.sales_profit,
  });
  const [calResult, setCalResult] = useState({});

  const { probability, division, team } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
    division: codebook.sales.division,
    team: codebook.sales.team,
  }));

  const onChangeDivision = (e) => {
    console.log('onchangedivision', e);
    setDivisionId(e);
  };
  console.log('divisionid', divisionId);

  const onChangeRadio = (e) => {
    setRadioValue(e.target.value);
  };
  // 매출이익 마진 계산
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
    console.log('--0--', salesValue);
    if (radioValue && salesValue && profitMarginValue) {
      console.log('--1--');
      setCalResult({
        margin: (profitMarginValue.sales_profit / salesValue) * 100,
      });
    } else if (!radioValue && salesValue && profitMarginValue) {
      console.log('--2--');
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

  // sales 테이블 insert
  //sales-performances, /sales-profits
  const onSubmit = async (values) => {
    setBtnDisabled(true);
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
    const _confirmed = probabilityChecked.checked === true ? true : false;
    const _probability =
      probabilityChecked.checked === true ? 5 : values.probability;

    const data = {
      customer: values.customer,
      name: values.sales_name,
      scode_division: values.division,
      scode_item: values.item,
      scode_team: values.team,
      confirmed: _confirmed,
      scode_probability: _probability,
      sales_recdate: moment(values.sales_rec_date.format('YYYY-MM-DD')),
      count: 1,
      description: values.description,
    };
    const result = await tbl_insert('api/sales-statuses', data);

    console.log('1. api/sales-statuses', result);
    // probability 5 -> 100% 의미함

    const paymentDate = values.payment_date || '';
    const profit_data = {
      sales_status: result.data.data.id,
      confirmed: _confirmed,
      scode_probability: _probability,
      sales: values.sales,
      sales_profit: _profit,
      sales_margin: _margin,
      sales_recdate: moment(values.sales_rec_date.format('YYYY-MM-DD')),
      paymentdate: moment(paymentDate),
      description: values.memo,
    };
    const result2 = await tbl_insert('api/sales-histories', profit_data);
    console.log('2. api/sales-histories', result2.data);
    // navigate('/sales');
    setAddSalesVisible(false);
    setBtnDisabled(false);
  };

  const onChangeSwitch = (e) => {
    console.log('스위치button', e);
    if (e) {
      const value = {
        checked: true,
        name: '매출확정',
      };
      setProbabilityChecked(value);
    } else {
      const value = {
        checked: false,
        name: '매출예정',
      };
      setProbabilityChecked(value);
    }
  };
  console.log('ckecked', probabilityChecked);

  return (
    <>
      {probability && division && team && customer ? (
        <>
          <AddSalesDrawerForm
            codebook={codebook}
            customer={customer}
            customerid={customerid}
            initialValues={initialValues}
            // probability={probability}
            // division={division}
            // team={team}

            addSalesVisible={addSalesVisible}
            addSalesOnClose={addSalesOnClose}
            probabilityChecked={probabilityChecked}
            onChangeSwitch={onChangeSwitch}
            //
            onChangeDivision={onChangeDivision}
            onSubmit={onSubmit}
            // divisionId={divisionId}
            calResult={calResult}
            onChangeRadio={onChangeRadio}
            salesValueOnchange={salesValueOnchange}
            profitMarginOnchange={profitMarginOnchange}
            radioValue={radioValue}
            profitMarginValue={profitMarginValue}
            salesConfirmed={salesConfirmed}
            btnDisabled={btnDisabled}
          />
        </>
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default AddSalesDrawerContainer;
