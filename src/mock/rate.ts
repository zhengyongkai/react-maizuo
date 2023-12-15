import { dataFormatArray } from './utils';

export default [
  {
    url: `/api/test`,
    method: 'get',
    response: () => {
      return dataFormatArray<string>(5, '@integer(0, 1000)');
    },
  },
];
