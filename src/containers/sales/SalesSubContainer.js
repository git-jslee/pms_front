import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalesSubMenu from '../../components/sales/SalesSubMenu';
import moment from 'moment';
import { setStartEndOfMonth, setParams, setTitle } from '../../modules/common';
import startEndDay from '../../modules/common/startEndDay';
import { getSalesQuery, getSalesList } from '../../modules/sales';
import SalesStatisticsContainer from './SalesStatisticsContainer';
import SalesAdvancedSearchForm from '../../components/sales/SalesAdvancedSearchForm';
import AddSalesDrawerContainer from './AddSalesDrawerContainer';
import calStartEndDayFromMonth from '../../modules/common/calStartEndDayFromMonth';
import { qs_salesByDate, qs_salesAdvanced } from '../../lib/api/query';

const SalesSubContainer = () => {
  const dispatch = useDispatch();
  // t상세 검색시..필요 정보..customer 정보
  // 매출구분, 매출품목, 사업부 코드...
  const { customers, status, error } = useSelector(({ customerList }) => ({
    customers: customerList.data,
    status: customerList.status,
    error: customerList.error,
  }));
  const { probability, division, item, team } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
    division: codebook.sales.division,
    item: codebook.sales.item,
    team: codebook.sales.team,
  }));

  const [addSalesVisible, setAddSalesVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState(false);
  // 검색조건 당월
  // const startMonth = moment().add(0, 'months').format('YYYY-MM');
  const startMonth = moment().format('YYYY-MM');
  const endMonth = moment().format('YYYY-MM');
  const dateFormat = 'YYYY-MM';
  const month = moment().format('MM');
  const buttonName = search ? '현황' : '상세검색';

  useEffect(() => {
    const startEnd = calStartEndDayFromMonth(startMonth, endMonth);
    const query = qs_salesByDate(startEnd[0], startEnd[1]);
    dispatch(getSalesList(query));
    dispatch(setTitle('매출현황 관리'));
    return () => {
      dispatch(setTitle(null));
    };
  }, [dispatch]);

  // 컴포넌트 언마운트시
  // useEffect(() => {
  //   return () => {
  //     dispatch(setParams(null));
  //   };
  // }, []);

  // const onChange = (value) => {
  //   console.log('onchange', value);
  //   if (value !== null) {
  //     const startEndOfDay = startEndDay(value[0], value[1]);
  //     dispatch(setStartEndOfMonth(startEndOfDay));
  //     dispatch(setParams(null));
  //   }
  // };

  // const onChangeDivision = (e) => {
  //   console.log('onchangedivision', e);
  //   setDivisionId(e);
  // };

  // const thisMonthOnClick = () => {
  //   console.log('조회 buttononclick');
  //   const startEndOfDay = startEndDay(
  //     moment().format('YYYY-MM'),
  //     moment().format('YYYY-MM'),
  //   );
  //   dispatch(setStartEndOfMonth(startEndOfDay));
  //   dispatch(setParams(null));
  // };

  const addSalesOnClick = () => {
    setAddSalesVisible(true);
  };
  const addSalesOnClose = () => {
    setAddSalesVisible(false);
  };

  const searchOnClick = () => {
    setSearchVisible(true);
  };
  const advancedSearch = () => {
    //기능구현..
    setSearch(!search);
    setSelectedCustomer(null);
  };
  const searchOnClose = () => {
    setSearchVisible(false);
  };
  // advanced search 에서 초기화 클릭시..매출처 항목 초기화 함수
  const resetSelectedCustomer = () => {
    console.log('함수실행 - resetSelectedCustomer');
    setSelectedCustomer(null);
  };

  // AutoComplete
  const searchOnSubmit = async (value) => {
    console.log('검색 - onSubmit', value);
    console.log('검색 - selectedCustomer', selectedCustomer);
    const start = moment(value.date[0]).format('YYYY-MM');
    const end = moment(value.date[1]).format('YYYY-MM');

    // const startEndOfDay = startEndDay(start, end);
    // const queryDate = `sales_rec_date_gte=${startEndOfDay[0]}&sales_rec_date_lte=${startEndOfDay[1]}&deleted=false`;
    // let queryString = '';
    // if (selectedCustomer) {
    //   queryString = queryString + `&customer.id=${selectedCustomer}`;
    // }
    // if (value.item) {
    //   queryString = queryString + `&scode_item.id=${value.item}`;
    // } else if (value.division) {
    //   queryString = queryString + `&scode_division.id=${value.division}`;
    // }
    // if (value.team) {
    //   queryString = queryString + `&scode_team.id=${value.team}`;
    // }

    // dispatch(getSalesList(start, end, queryString));
    // console.log('querystring', queryString);

    // const response = await api.getSalesQueryString(queryString);
    // console.log('response', response.data);
    // dispatch(getSalesQuery(queryString));
    setSelectedCustomer(null);
    // 완료시 SalesSearchForm 닫기
    setSearchVisible(false);
  };

  const advancedSearchOnsubmit = async (value) => {
    console.log('검색 - onSubmit', value);
    console.log('검색 - selectedCustomer', selectedCustomer);
    let filters = {};
    const startMonth = moment(value.date[0]).format('YYYY-MM');
    const endMonth = moment(value.date[1]).format('YYYY-MM');
    const startEnd = calStartEndDayFromMonth(startMonth, endMonth);
    const cid = selectedCustomer;
    const arg = [
      {
        deleted: {
          $eq: false,
        },
      },
      {
        sales_recdate: {
          $gte: startEnd[0],
        },
      },
      {
        sales_recdate: {
          $lte: startEnd[1],
        },
      },
    ];

    // if (selectedCustomer) {
    //   filters = {
    //     $and: [
    //       {
    //         sales_recdate: {
    //           $gte: startEnd[0],
    //         },
    //       },
    //       {
    //         sales_recdate: {
    //           $lte: startEnd[1],
    //         },
    //       },
    //       {
    //         customer: {
    //           id: {
    //             $eq: cid,
    //           },
    //         },
    //       },
    //     ],
    //   };
    // } else {
    //   filters = {
    //     $and: [
    //       {
    //         sales_recdate: {
    //           $gte: startEnd[0],
    //         },
    //       },
    //       {
    //         sales_recdate: {
    //           $lte: startEnd[1],
    //         },
    //       },
    //     ],
    //   };
    // }
    if (selectedCustomer) {
      arg.push({
        customer: {
          id: { $eq: cid },
        },
      });
    }
    if (value.item) {
      arg.push({
        scode_item: {
          id: { $eq: value.item },
        },
      });
    } else if (value.division) {
      arg.push({
        scode_division: {
          id: { $eq: value.division },
        },
      });
    }
    if (value.team) {
      arg.push({
        scode_team: {
          id: { $eq: value.team },
        },
      });
    }

    console.log('arg', arg);

    const query = qs_salesAdvanced(arg);
    dispatch(getSalesList(query));
    // const startEndOfDay = startEndDay(start, end);
    // const queryDate = `sales_rec_date_gte=${startEndOfDay[0]}&sales_rec_date_lte=${startEndOfDay[1]}&deleted=false`;
    // let queryString = queryDate;
    let queryString = '';

    if (value.item) {
      queryString = queryString + `&scode_item.id=${value.item}`;
    } else if (value.division) {
      queryString = queryString + `&scode_division.id=${value.division}`;
    }
    if (value.team) {
      queryString = queryString + `&scode_team.id=${value.team}`;
    }

    // dispatch(getSalesList(start, end, queryString));
    // console.log('querystring', queryString);

    // const response = await api.getSalesQueryString(queryString);
    // console.log('response', response.data);
    // dispatch(getSalesQuery(queryString));
  };

  const customerOnSelect = (data, option) => {
    // console.log('onSelect', data);
    console.log('onSelect-option', option);
    setSelectedCustomer(option.id);
  };

  return (
    <>
      <SalesSubMenu
        startMonth={startMonth}
        endMonth={endMonth}
        searchOnClick={searchOnClick}
        advancedSearch={advancedSearch}
        buttonName={buttonName}
        addSalesOnClick={addSalesOnClick}
      />
      <hr />
      {search ? (
        <SalesAdvancedSearchForm
          searchOnSubmit={advancedSearchOnsubmit}
          customers={customers}
          division={division}
          item={item}
          team={team}
          customerOnSelect={customerOnSelect}
          resetSelectedCustomer={resetSelectedCustomer}
        />
      ) : (
        <SalesStatisticsContainer />
      )}
      {addSalesVisible ? (
        <AddSalesDrawerContainer
          addSalesVisible={addSalesVisible}
          addSalesOnClose={addSalesOnClose}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default SalesSubContainer;
