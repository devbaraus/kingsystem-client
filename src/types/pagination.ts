export type Pagination<T> = {
  data: T[];
  total: number;
  page: number;
  pages: number;
  next: string | null;
  previous: string | null;
};
