import * as api from '../../lib/api/api';

const customerSortDuplicate = async (path, query) => {
  const request = await api.getQueryString(path, query);
  //   console.log('**result**', request.data.data);

  // 1. 경로 정리
  const step1 = request.data.data.map((cus) => {
    return {
      id: cus.attributes.customer.data.id,
      name: cus.attributes.customer.data.attributes.name,
    };
  });
  //   console.log('**1.고객추출 **', step1);
  // 2. 중복 제거
  const step2 = step1.filter((v1, i) => {
    return (
      step1.findIndex((v2) => {
        return v1.id === v2.id;
      }) === i
    );
  });
  //   console.log('**2.고객추출 - 중복제거**', step2);
  // 3. 오름차순 정렬
  const result = step2.sort((a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  //   console.log('**3.고객 오름차순**', result);

  return result;
};

export default customerSortDuplicate;
