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
    const value = list.sales_profits[list.count - 1];
    // console.log('**계산용**', value);
    // 매출 확정 일경우
    if (value.confirmed === true) {
      returnData[99] = [
        returnData[99][0] + value.sales,
        returnData[99][1] + value.sales_profit,
      ];
      // 객체에 값이 없을경우 생성
    } else {
      // 값이 있을 경우 기존 객체에 값 더하기
      returnData[value.scode_probability] = [
        returnData[value.scode_probability][0] + value.sales,
        returnData[value.scode_probability][1] + value.sales_profit,
      ];
    }
  });
  return returnData;
};

export default sumSalesValueByMonth;
