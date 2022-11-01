export interface IDatePickerCustom{
    date?: Date;
    isSeleted?: boolean;
    isToday?: boolean;
    isDefault?: boolean;
}

export class DatePickerCustom implements IDatePickerCustom{
    
   constructor(public date?: Date, public isSeleted?: boolean, public isToday?: boolean, public isDefault?: boolean){
    this.date = date;
    this.isSeleted = isSeleted;
    this.isToday = isToday;
    this.isDefault = isDefault;
}
}