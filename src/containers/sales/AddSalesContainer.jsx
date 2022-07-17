import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddSalesPerformanceForm from '../../components/sales/AddSalesPerformanceForm';
// import tbl_insert from '../../modules/tbl_insert';
import { tbl_insert } from '../../modules/common/tbl_crud';
import moment from 'moment';
import 'moment-timezone';
// import 'moment/locale/ko-kr';
import { useNavigate } from 'react-router-dom';
import AutoComplete from '../../components/common/AutoComplete';

const Base = styled.div`
  width: 80%;
`;

const AddSalesContainer = () => {
  const navigate = useNavigate();
  // 중복Submit 방지
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [divisionId, setDivisionId] = useState(null);
  const [radioValue, setRadioValue] = useState(true);
  const [salesValue, setSalesValue] = useState(null);
  const [checked, setChecked] = useState({
    checked: false,
    name: '매출예정',
  });
  const [profitMarginValue, setProfitMarginValue] = useState({
    margin: null,
    sales_profit: null,
  });
  const [calResult, setCalResult] = useState({});
  const { probability, division, item, team } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
    division: codebook.sales.division,
    item: codebook.sales.item,
    team: codebook.sales.team,
  }));

  const { customer } = useSelector(({ customerList }) => ({
    customer: customerList.data,
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
    const _confirmed = checked.checked === true ? true : false;
    const _probability = checked.checked === true ? 5 : values.probability;

    const sales_data = {
      customer: values.customer,
      name: values.sales_name,
      scode_division: values.division,
      scode_item: values.item,
      scode_team: values.team,
      confirmed: _confirmed,
      scode_probability: _probability,
      sales_recdate: moment(values.sales_rec_date).tz('Asia/Seoul'),
      count: 1,
      description: values.description,
    };
    console.log('1. sales_data', sales_data);
    const result = await tbl_insert('api/sales-statuses', sales_data);
    console.log('1. sales-statuses', result.data);
    // probability 5 -> 100% 의미함

    const paymentDate = values.payment_date || '';
    const profit_data = {
      sales_status: result.data.data.id,
      scode_probability: _probability,
      sales: values.sales,
      sales_profit: _profit,
      sales_margin: _margin,
      sales_recdate: moment(values.sales_rec_date).tz('Asia/Seoul'),
      paymentdate: moment(paymentDate),
      confirmed: _confirmed,
      description: values.memo,
    };
    console.log('1-1. sprofit_data', profit_data);
    const result2 = await tbl_insert('api/sales-histories', profit_data);
    console.log('2. sales-profits', result2.data);
    setBtnDisabled(false);
    navigate('/sales');
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

  return (
    <>
      {probability && division && team && customer ? (
        <>
          <Base>
            <AutoComplete lists={customer} />
            <AddSalesPerformanceForm
              probability={probability}
              division={division}
              item={item}
              team={team}
              customer={customer}
              onChangeDivision={onChangeDivision}
              onSubmit={onSubmit}
              divisionId={divisionId}
              calResult={calResult}
              onChangeRadio={onChangeRadio}
              salesValueOnchange={salesValueOnchange}
              profitMarginOnchange={profitMarginOnchange}
              radioValue={radioValue}
              profitMarginValue={profitMarginValue}
              checked={checked}
              onChangeSwitch={onChangeSwitch}
              btnDisabled={btnDisabled}
            />
          </Base>
        </>
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default AddSalesContainer;
