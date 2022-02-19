import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalesSubMenu from '../../components/sales/SalesSubMenu';
import moment from 'moment';
import { setStartEndOfMonth, setParams } from '../../modules/common';
import startEndDay from '../../modules/common/startEndDay';
import { getSalesQuery } from '../../modules/sales';
import SalesStatisticsContainer from './SalesStatisticsContainer';
import SalesAdvancedSearchForm from '../../components/sales/SalesAdvancedSearchForm';
import AddSalesDrawerContainer from './AddSalesDrawerContainer';

const SalesSubContainer = () => {
  const dispatch = useDispatch();
  // t상세 검색시..필요 정보..customer 정보
  // 매출구분, 매출품목, 사업부 코드...
  const { customers, status, error } = useSelector(({ customerList }) => ({
    customers: customerList.data,
    status: customerList.status,
    error: customerList.error,
  }));
  const { probability, division, team } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
    division: codebook.sales.division,
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
    const startEndOfDay = startEndDay(startMonth, endMonth);
    dispatch(setStartEndOfMonth(startEndOfDay));
  }, [dispatch]);

  // 컴포넌트 언마운트시
  useEffect(() => {
    return () => {
      dispatch(setParams(null));
    };
  }, []);

  const onChange = (value) => {
    console.log('onchange', value);
    if (value !== null) {
      const startEndOfDay = startEndDay(value[0], value[1]);
      dispatch(setStartEndOfMonth(startEndOfDay));
      dispatch(setParams(null));
    }
  };

  // const onChangeDivision = (e) => {
  //   console.log('onchangedivision', e);
  //   setDivisionId(e);
  // };

  const thisMonthOnClick = () => {
    console.log('조회 buttononclick');
    const startEndOfDay = startEndDay(
      moment().format('YYYY-MM'),
      moment().format('YYYY-MM'),
    );
    dispatch(setStartEndOfMonth(startEndOfDay));
    dispatch(setParams(null));
  };

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
  // AutoComplete
  const searchOnSubmit = async (value) => {
    console.log('검색 - onSubmit', value);
    console.log('검색 - selectedCustomer', selectedCustomer);
    const start = moment(value.date[0]).format('YYYY-MM');
    const end = moment(value.date[1]).format('YYYY-MM');
    const startEndOfDay = startEndDay(start, end);
    const queryDate = `sales_rec_date_gte=${startEndOfDay[0]}&sales_rec_date_lte=${startEndOfDay[1]}&deleted=false`;
    let queryString = queryDate;
    if (selectedCustomer) {
      queryString = queryString + `&customer.id=${selectedCustomer}`;
    }
    if (value.item) {
      queryString = queryString + `&scode_item.id=${value.item}`;
    } else if (value.division) {
      queryString = queryString + `&scode_division.id=${value.division}`;
    }
    if (value.team) {
      queryString = queryString + `&scode_team.id=${value.team}`;
    }
    console.log('querystring', queryString);

    // const response = await api.getSalesQueryString(queryString);
    // console.log('response', response.data);
    dispatch(getSalesQuery(queryString));
    setSelectedCustomer(null);
    // 완료시 SalesSearchForm 닫기
    setSearchVisible(false);
  };

  const advancedSearchOnsubmit = async (value) => {
    console.log('검색 - onSubmit', value);
    console.log('검색 - selectedCustomer', selectedCustomer);
    const start = moment(value.date[0]).format('YYYY-MM');
    const end = moment(value.date[1]).format('YYYY-MM');
    const startEndOfDay = startEndDay(start, end);
    const queryDate = `sales_rec_date_gte=${startEndOfDay[0]}&sales_rec_date_lte=${startEndOfDay[1]}&deleted=false`;
    let queryString = queryDate;
    if (selectedCustomer) {
      queryString = queryString + `&customer.id=${selectedCustomer}`;
    }
    if (value.item) {
      queryString = queryString + `&scode_item.id=${value.item}`;
    } else if (value.division) {
      queryString = queryString + `&scode_division.id=${value.division}`;
    }
    if (value.team) {
      queryString = queryString + `&scode_team.id=${value.team}`;
    }
    console.log('querystring', queryString);

    // const response = await api.getSalesQueryString(queryString);
    // console.log('response', response.data);
    dispatch(getSalesQuery(queryString));
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
          team={team}
          customerOnSelect={customerOnSelect}
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
