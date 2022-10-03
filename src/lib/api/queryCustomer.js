import qs from 'qs';
import moment from 'moment';

// 고객 리스트
// customerList.jsx

export const qs_customers = (start, limit) =>
  qs.stringify(
    {
      filters: {
        used: {
          $eq: true,
        },
      },
      sort: ['name:asc'],
      fields: ['name', 'name_eng', 'business_type'],
      pagination: {
        start: start,
        limit: limit,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
