import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesId } from '../../modules/sales';
import SalesViewDetailTable from '../../components/sales/SalesViewDetailTable';
import SalesUpdateForm from '../../components/sales/SalesUpdateForm';
import { changeMode } from '../../modules/sales';
import tbl_insert from '../../modules/tbl_insert';
import tbl_update from '../../modules/tbl_update';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const SalesDetailContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //웹토큰 가져오기..값 변경시에만 실행되게 설정 변경..
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  const { id } = useParams();
  const [tableData, setTableData] = useState();
  const { list, loading, mode } = useSelector(({ sales, loading }) => ({
    list: sales.detail,
    loading: loading['sales/GET_SALESID'],
    mode: sales.mode,
  }));
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

  const { probability } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
  }));

  console.log('salesid', list);

  useEffect(() => {
    dispatch(getSalesId(id));
    dispatch(
      changeMode({
        mode: 'VIEW',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    console.log('---useEffect 실행---');

    if (!list) {
      console.log('리턴실행..');
      return;
    }
    const sales_profits = list.sales_profits;
    const salesProfitData = [];
    const summaryData = {};
    const data = sales_profits.map((list, index) => {
      // 매출, 매출이익, 마진 정보 가져오기, 가장 최근 입력 데이터 가져옴
      const array = {
        key: list.id,
        no: index + 1,
        probability: list.scode_probability,
        // type: list.type,
        confirmed: list.confirmed ? 'YES' : 'NO',
        sales: list.sales,
        profit: list.sales_profit,
        margin: list.profit_margin,
        sales_rec_date: list.sales_rec_date,
        payment_date: list.payment_date,
        description: list.description,
      };
      return array;
    });
    setTableData(data.reverse());
  }, [list]);

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
    }
  }, [radioValue, salesValue, profitMarginValue]);

  const buttonOnClick = () => {
    console.log('edit 버튼 클릭');
    if (mode === 'VIEW') {
      dispatch(
        changeMode({
          mode: 'EDIT',
        }),
      );
    } else if (mode === 'EDIT') {
      dispatch(
        changeMode({
          mode: 'VIEW',
        }),
      );
    }
  };

  const onSubmit = async (values) => {
    console.log('onSubmit', values);
    const jwt = auth.jwt;
    let _profit;
    let _margin;
    if (radioValue) {
      _profit = parseInt(profitMarginValue.sales_profit);
      _margin = parseInt(calResult.margin);
    } else {
      _margin = parseInt(profitMarginValue.margin);
      _profit = parseInt(calResult.profit);
    }

    const datas = [
      {
        sales_rec_date: moment(values.sales_rec_date.format('YYYY-MM-DD')),
        count: list.sales_profits.length + 1,
        // description: values.description,
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ];
    const result = await tbl_update('sales-performances', id, datas);
    console.log('1. sales-performances_update', result.data);
    // probability 5 -> 100% 의미함
    const _confirmed = checked.checked === true ? true : false;
    const _probability = checked.checked === true ? 5 : values.probability;
    const paymentDate = values.payment_date || '';
    const result2 = await tbl_insert('sales-profits', [
      {
        sales_performance: id,
        confirmed: _confirmed,
        scode_probability: _probability,
        sales: values.sales,
        sales_profit: _profit,
        profit_margin: _margin,
        sales_rec_date: moment(values.sales_rec_date.format('YYYY-MM-DD')),
        payment_date: moment(paymentDate),
        description: values.memo,
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ]);
    console.log('2. sales-profits', result2.data);
    dispatch(getSalesId(id));
    dispatch(
      changeMode({
        mode: 'VIEW',
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

  const updateForm = () => {
    return (
      <>
        <SalesUpdateForm
          list={list}
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
    );
  };

  return (
    <>
      {list && probability ? (
        mode === 'VIEW' ? (
          <SalesViewDetailTable
            list={list}
            tableData={tableData}
            buttonOnClick={buttonOnClick}
            mode={mode}
          />
        ) : (
          <SalesViewDetailTable
            list={list}
            tableData={tableData}
            buttonOnClick={buttonOnClick}
            mode={mode}
            updateForm={updateForm()}
          />
        )
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default SalesDetailContainer;
