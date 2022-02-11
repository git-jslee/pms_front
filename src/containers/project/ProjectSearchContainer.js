import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setStartEndOfMonth } from '../../modules/common';
import MonthlySearch from '../../components/common/MonthlySearch';
import startEndDay from '../../modules/common/startEndDay';

const ProjectSearchContainer = () => {
  const dispatch = useDispatch();
  // 검색조건 6월이전 부터 검색
  const startMonth = moment().subtract(6, 'M').format('YYYY-MM');
  const endMonth = moment().format('YYYY-MM');

  useEffect(() => {
    const startEndOfDay = startEndDay(startMonth, endMonth);
    // const month = [
    //   moment(startMonth).format('YYYY-MM'),
    //   moment(endMonth).format('YYYY-MM'),
    // ];
    dispatch(setStartEndOfMonth(startEndOfDay));
  }, [dispatch]);

  // const { startMonth, endMonth } = useSelector(({ common }) => ({
  //   startMonth: common.month[0],
  //   endMonth: common.month[1],
  // }));
  const dateFormat = 'YYYY-MM';

  const onChange = (value) => {
    console.log('onchange', value);
    if (value !== null) {
      const startEndOfDay = startEndDay(value[0], value[1]);
      // const month = [
      //   moment(value[0]).format('YYYY-MM'),
      //   moment(value[1]).format('YYYY-MM'),
      // ];
      dispatch(setStartEndOfMonth(startEndOfDay));
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
