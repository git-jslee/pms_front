import React, { useState } from 'react';
import AddSalesPerformanceForm from '../../components/sales/AddSalesPerformanceForm';
import { useSelector } from 'react-redux';

const AddSalesContainer = () => {
  const [divisionId, setDivisionId] = useState(null);
  const { probability, division, team } = useSelector(({ codebook }) => ({
    probability: codebook.sales.probability,
    division: codebook.sales.division,
    team: codebook.sales.team,
  }));

  const { customer } = useSelector(({ customerList }) => ({
    customer: customerList.data,
  }));

  const onSubmit = (e) => {
    console.log('onSubmit', e);
  };

  const onChangeDivision = (e) => {
    console.log('onchangedivision', e);
    setDivisionId(e);
  };
  console.log('divisionid', divisionId);

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
        />
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default AddSalesContainer;
