import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePickerCustom } from 'src/app/shared/model/date-picker.model';
@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  public date = moment();
  public dateForm?: FormGroup = new FormGroup({});

  public isReserved: any;

  public daysArr:DatePickerCustom[] = [];

  constructor(private fb: FormBuilder) {
  }


  public ngOnInit() {
    this.getDays();
    console.log(this.daysArr)
  }


  getDays(){
    let date = new Date();
    for(let i = 0; i < 10;i++){
      let d = new Date(date.getTime() + i * (24 * 60 * 60 * 1000))
      this.daysArr.push({date: d, isSeleted:i==0 ? true : false});
    }
  }

  
  click(event: any){
    console.log(event)
  }
  isToday(date: Date){
    console.log(date)
    return date.getDate() === new Date().getDate();
  }
}
