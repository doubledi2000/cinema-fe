

export default class CommonUtil{
    static days = ["C.N", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
    static getDay(date: Date){
        if(date instanceof Date) {
            return this.days[date.getDay()];
        }
        return this.days[0];
    }
}