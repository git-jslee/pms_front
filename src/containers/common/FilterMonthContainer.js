import React from 'react';
import moment from 'moment';
import FilterMonth from '../../components/common/FilterMonth';
import * as api from '../../lib/api/api';

const FilterMonthContainer = () => {
  const initialValues = {
    filterMonth: [moment().subtract(6, 'M'), moment().add(1, 'd')],
  };
  const onSubmit = async (value) => {
    console.log('onSubmit', value);
    const startDate = value.filterMonth[0].format('YYYY-MM-DD');
    const endDate = value.filterMonth[1].format('YYYY-MM-DD');
    const result = await api.getProjectFiltered(startDate, endDate);
    console.log('result', result);
  };
  return (
    <>
      <FilterMonth initialValues={initialValues} onSubmit={onSubmit} />
    </>
  );
};

export default FilterMonthContainer;
