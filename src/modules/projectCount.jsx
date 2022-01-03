import { apiProjectCount } from '../lib/api/api';

export const getProjectCount = () => {
  apiProjectCount()
    .then((result) => {
      console.log('프로젝트 카운트 조회 성공', result);
    })
    .catch((error) => {
      console.log('프로젝트 카운트 조회 실패', error);
    });
};
