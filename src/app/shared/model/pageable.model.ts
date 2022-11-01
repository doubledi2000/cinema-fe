export interface IPageable {
    pageIndex?: number;
    pageSize?: number;
    total?: number;
    hasPageable?: boolean;
  }
  
  export class Pageable implements IPageable {
    constructor(
      public pageIndex?: number,
      public pageSize?: number,
      public total?: number,
      public hasPageable?: boolean,
    ) {
    }
  }
  