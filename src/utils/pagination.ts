import { DEFAULT_PAGE_SIZE } from '../constant/index';

export const customPaginationLabels = () => {
  return {
    totalDocs: 'totalData',
    totalPages: 'totalPages',
    docs: 'data',
    limit: 'size',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    pagingCounter: 'slNo',
    meta: 'paginator'
  };
};

export const getPagination = (page, size) => {
  const limit = size ? +size : parseInt(DEFAULT_PAGE_SIZE);
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export const getDefaultOptions = (page, size) => {
  const limit = size ? +size : parseInt(DEFAULT_PAGE_SIZE);
  return { customLabels: customPaginationLabels(), page, limit };
};
