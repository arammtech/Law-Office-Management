import { ICaseRow } from './i-case-row';

export interface ICasesList {
  pageIndex: number;
  pageSize: number;
  totalItemsCount: number;
  itemsCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: ICaseRow[];
}