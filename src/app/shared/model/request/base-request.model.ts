export interface IBaseRequestModel {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    hasPageable?: boolean;
  }
  
  export interface IPagination {
    pageIndex?: number;
    pageSize?: number;
  }
  
  export interface ISearch {
    keyword?: string;
    sortBy?: string;
  }
  
  export interface ISearchWithPagination extends ISearch, IPagination {}
  