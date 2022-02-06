import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setStartEndOfMonth } from '../../modules/common';
import MonthlySearch from '../../components/common/MonthlySearch';

const ProjectSearchContainer = () => {
  const dispatch = useDispatch();
  // 검색조건 6월이전 부터 검색
  const startMonth = moment().subtract(6, 'M');
  const endMonth = moment();
  const dateFormat = 'YYYY-MM';

  useEffect(() => {
    const month = [
      moment(startMonth).format('YYYY-MM'),
      moment(endMonth).format('YYYY-MM'),
    ];
    dispatch(setStartEndOfMonth(month));
  }, []);

  const onChange = (value) => {
    console.log('onchange', value);
    if (value !== null) {
      const month = [
        moment(value[0]).format('YYYY-MM'),
        moment(value[1]).format('YYYY-MM'),
      ];
      dispatch(setStartEndOfMonth(month));
    }
  };

  return (
    <>
      <MonthlySearch
        name="프로젝트"
        defaultValue={[
          moment(startMonth, dateFormat),
          moment(endMonth, dateFormat),
        ]}
        onChange={onChange}
      />
    </>
  );
};

export default ProjectSearchContainer;
