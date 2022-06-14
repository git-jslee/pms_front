import * as api from '../api/api';

// api 전체 데이터 가져오기
const apiQueryAll = async (path, qs) => {
  let start = 0;
  const limit = 50;
  const resultArr = [];
  const query = qs(start, limit);
  const request = await api.getQueryString(path, query);
  resultArr.push(...request.data.data);
  const totalCount = request.data.meta.pagination.total;

  for (start = start + limit; start <= totalCount; start += limit) {
    const newQuery = qs(start, limit);
    const newRequest = await api.getQueryString(path, newQuery);
    resultArr.push(...newRequest.data.data);
  }
  //   console.log('>>>>>>>> resultArr >>>>>>>>', resultArr, totalCount);
  return resultArr;
};

export default apiQueryAll;
