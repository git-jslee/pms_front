import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesId } from '../../modules/sales';
import SalesViewDetailTable from '../../components/sales/SalesViewDetailTable';
import SalesValueUpdateForm from '../../components/sales/SalesValueUpdateForm';
import SalesBasicUpdateForm from '../../components/sales/SalesBasicUpdateForm';
import { changeEditMode } from '../../modules/common';
import { changeMode } from '../../modules/sales';
import tbl_insert from '../../modules/tbl_insert';
import tbl_update from '../../modules/tbl_update';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import InfoSalesDrawerForm from '../../components/sales/InfoSalesDrawerForm';

const { confirm } = Modal;

const InfoSalesDrawerContainer = ({
  infoSalesVisible,
  infoSalesOnClose,
  salesId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //웹토큰 가져오기..값 변경시에만 실행되게 설정 변경..
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  // const { id } = useParams();
  const [tableData, setTableData] = useState();
  const { customer, codebook } = useSelector(({ codebook, customerList }) => ({
    codebook: codebook.sales,
    customer: customerList.data,
  }));
  const { list, loading, mode, editmode } = useSelector(
    ({ sales, loading, common }) => ({
      list: sales.detail,
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

  console.log('salesid', list);

  useEffect(() => {
    dispatch(getSalesId(salesId));
    dispatch(
      changeEditMode({
        editmode: false,
      }),
    );
  }, [dispatch]);

  // update form 관련 값 설정
  // useEffect(() => {
  //   const sales_profits = list.sales_profits;
  //   const sales_profit = sales_profits[sales_profits.length - 1];
  //   setSalesValue(sales_profit.sales);
  //   setProfitMarginValue({
  //     margin: null,
  //     sales_profit: sales_profit.sales_profit,
  //   });
  // }, []);

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
      const sales_profits = list.sales_profits;
      const sales_profit = sales_profits[sales_profits.length - 1];
      dispatch(
        changeEditMode({
          editmode: true,
        }),
      );
      setSalesValue(sales_profit.sales);
      setProfitMarginValue({
        margin: null,
        sales_profit: sales_profit.sales_profit,
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
    const _confirmed = checked.checked === true ? true : false;
    const _probability = checked.checked === true ? 5 : values.probability;
    const datas = [
      {
        confirmed: _confirmed,
        scode_probability: _probability,
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
    const result = await tbl_update('sales-performances', list.id, datas);
    console.log('1. sales-performances_update', result.data);
    // probability 5 -> 100% 의미함
    const paymentDate = values.payment_date || '';
    const result2 = await tbl_insert('sales-profits', [
      {
        sales_performance: list.id,
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
    dispatch(getSalesId(list.id));
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
    const jwt = auth.jwt;
    const datas = [
      {
        name: values.sales_name,
        customer: values.customer,
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
    const result = await tbl_update('sales-performances', list.id, datas);
    console.log('1. sales-performances_update', result.data);

    dispatch(getSalesId(list.id));
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
    const sales_profits = list.sales_profits;
    const sales_profit = sales_profits[sales_profits.length - 1];
    const _payment_date = sales_profit.payment_date
      ? moment(sales_profit.payment_date)
      : '';
    const initialValues = {
      // SalesBasicUpdateForm
      sales_name: list.name,
      customer: list.customer.id,
      division: list.scode_division.id,
      item: list.scode_item.id,
      team: list.scode_team.id,
      description: list.description,
      //SalesValueUpateForm
      confirmed: sales_profit.confirmed,
      sales: sales_profit.sales,
      sales_profit: sales_profit.sales_profit,
      probability: sales_profit.scode_probability,
      sales_rec_date: moment(sales_profit.sales_rec_date),
      payment_date: _payment_date,
    };
    // setSalesValue(sales_profit.sales);

    return (
      <>
        {editRadioValue === 1 ? (
          <>
            <SalesValueUpdateForm
              initialValues={initialValues}
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
      content: `[매출처 : ${list.customer.name}], [건명 : ${list.name}]`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        console.log('매출항목 삭제', list.id);
        const jwt = auth.jwt;
        const datas = [
          {
            deleted: true,
          },
          {
            headers: {
              Authorization: 'Bearer ' + jwt,
            },
          },
        ];
        const result = await tbl_update('sales-performances', list.id, datas);
        console.log('항목삭제 성공', result);
        navigate('/sales');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const onClickItemDelete = async () => {
    console.log('매출항목 삭제', list.id);
    const jwt = auth.jwt;

    const datas = [
      {
        deleted: true,
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ];
    const result = await tbl_update('sales-performances', list.id, datas);
    console.log('항목삭제 성공', result);
    navigate('/sales');
  };

  console.log('list', list);
  console.log('2.infoSalesVisible', infoSalesVisible);

  return (
    <>
      {list && probability ? (
        !editmode ? (
          <InfoSalesDrawerForm
            list={list}
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
            list={list}
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
