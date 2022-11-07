import { Component, Input, OnInit } from '@angular/core';
import { Showtime, IShowtime } from '../../../shared/model/showtime.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  seats: any[] = [
    {
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'HOLDED'
    },{
      type: 'vip',
      status: 'HOLDED'
    },{
      type: 'sweet',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'YOUR_SELECT'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'AVAILABLE'
    },{
      type: 'normal',
      status: 'SOLDED'
    },{
      type: 'normal',
      status: 'SOLDED'
    },{
      type: 'normal',
      status: 'SOLDED'
    },
  ]
  @Input() detail?: IShowtime = new Showtime();
  constructor() { }

  ngOnInit(): void {
    console.log(this.detail)
  }

  change(item: any): void{
    if (item.status == 'AVAILABLE'){
      item.status = 'YOUR_SELECT';
    }else if(item.status == 'YOUR_SELECT'){
      item.status = 'AVAILABLE';
    }
  }
}
