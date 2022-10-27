import { PAGINATION } from "../constant/pagination.constant";


export default class CommonUtil{
    static days = ["C.N", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
    static getDay(date: Date){
        if(date instanceof Date) {
            return this.days[date.getDay()];
        }
        return this.days[0];
    }

    static trim(obj: any): object {
        return Object.keys(obj).reduce((acc: any, curr: string) => {
          if (typeof obj[curr] === 'string') {
            acc[curr] = obj[curr].trim();
          } else {
            acc[curr] = obj[curr];
          }
          return acc;
        }, {});
    }

    static getIndex(
        index: number,
        page: number = PAGINATION.PAGE_DEFAULT,
        size: number = PAGINATION.SIZE_DEFAULT
      ): number {
        return (page - 1) * size + index + 1;
    }

    static modalBase(
      component: any,
      params: {},
      width: string = '50%',
      center: boolean = true,
      clickOutSide: boolean = false,
      showBtnClose: boolean = true
    ): object {
      return {
        nzWidth: width,
        nzCentered: center,
        nzMaskClosable: clickOutSide,
        nzClosable: showBtnClose,
        nzContent: component,
        nzComponentParams: {
          ...params,
        },
      };
    }
}

