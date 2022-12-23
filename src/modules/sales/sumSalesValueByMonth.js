// 기간별 예상매출, 예상매출이익, 실제매출액, 실제매출이익 합계산

const sumSalesValueByMonth = (salesListValue) => {
  const returnData = {
    1: [0, 0],
    2: [0, 0],
    3: [0, 0],
    4: [0, 0],
    5: [0, 0],
    99: [0, 0],
  };

  const sumSalesList = salesListValue.map((list) => {
    const slist = list.attributes;
    // const value = slist.sales_histories.data[slist.count - 1];
    const value = slist.sales_histories.data[0];
    console.log('**계산용**', slist, value);
    // 매출 확정 일경우
    // 데이터가 없을경우 처리 로직 추가 필요..
    if (value.attributes.confirmed === true) {
      returnData[99] = [
        returnData[99][0] + value.attributes.sales,
        returnData[99][1] + value.attributes.sales_profit,
      ];
      // 객체에 값이 없을경우 생성
    } else {
      // 값이 있을 경우 기존 객체에 값 더하기
      returnData[slist.scode_probability.data.id] = [
        returnData[slist.scode_probability.data.id][0] + value.attributes.sales,
        returnData[slist.scode_probability.data.id][1] +
          value.attributes.sales_profit,
      ];
    }
  });
  return returnData;
};

export default sumSalesValueByMonth;
