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
        nzBodyStyle: {
          'max-height': '800px',

        }
      };
    }

    static printTime(time: number){
      const hourStart = Math.floor(time/ 60);
    const miniuteStart = time - hourStart * 60;
    let hourStartStr = '';
    let miniuteStartStr = '';
    if(hourStart < 10) {
      hourStartStr = '0' + hourStart;
    }else {
      hourStartStr += hourStart;
    }
    if(miniuteStart < 10) {
      miniuteStartStr = '0' + miniuteStart;
    }else {
      miniuteStartStr+=miniuteStart
    }
    return hourStartStr + ':' + miniuteStartStr ;
    }

    static getTime(time: any){
      const d = new Date(time)
      return  d.getHours() * 60 +  d.getMinutes();
    }
}

