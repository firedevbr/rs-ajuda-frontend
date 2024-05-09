interface PagedResponse<T> {
  current_page: number;
  data: T[];
  per_page: number;
  total: number;
  from: number;
  to: number;
  last_page: number;
}

export default PagedResponse;