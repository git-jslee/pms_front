import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddSalesPerformanceForm from '../../components/sales/AddSalesPerformanceForm';
import tbl_insert from '../../modules/tbl_insert';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const AddSalesContainer = () => {
  const navigate = useNavigate();
  //웹토큰 가져오기..값 변경시에만 실행되게 설정 변경..
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));

  const [divisionId, setDivisionId] = useState(null);
  const [radioValue, setRadioValue] = useState(true);
  const [salesValue, setSalesValue] = useState();
  const [profitMarginValue, setProfitMarginValue] = useState({
    margin: null,
    sales_profit: null,
  });
  const [calResult, setCalResult] = useState({});
  const { probability, division, team } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
    division: codebook.sales.division,
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
    }
  }, [radioValue, salesValue, profitMarginValue]);

  // sales 테이블 insert
  //sales-performances, /sales-profits
  const onSubmit = async (values) => {
    console.log('onSubmit', values);
    const jwt = auth.jwt;
    let _profit;
    let _margin;
    if (radioValue) {
      _profit = profitMarginValue.sales_profit;
      _margin = calResult.margin;
    } else {
      _margin = profitMarginValue.margin;
      _profit = calResult.profit;
    }
    const datas = [
      {
        customer: values.customer,
        scode_probability: values.probability,
        name: values.sales_name,
        scode_division: values.division,
        scode_item: values.item,
        scode_team: values.team,
        description: values.description,
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ];
    const result = await tbl_insert('sales-performances', datas);
    console.log('1. sales-performances', result.data);
    const result2 = await tbl_insert('sales-profits', [
      {
        sales_performance: result.data.id,
        type: 'plan',
        sales: values.sales,
        sales_profit: _profit,
        profit_margin: _margin,
        sales_rec_date: moment(values.sales_rec_date.format('YYYY-MM-DD')),
        payment_date: moment(values.payment_date.format('YYYY-MM-DD')),
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ]);
    console.log('2. sales-profits', result2.data);
    navigate('/sales');
  };

  return (
    <>
      {probability && division && team && customer ? (
        <AddSalesPerformanceForm
          probability={probability}
          division={division}
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
        />
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default AddSalesContainer;
