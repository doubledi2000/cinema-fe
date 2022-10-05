import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      console.log(this.seats)
    }, 5000)
  }

  change(item: any): void{
    if (item.status == 'AVAILABLE'){
      item.status = 'YOUR_SELECT';
    }else if(item.status == 'YOUR_SELECT'){
      item.status = 'AVAILABLE';
    }
  }
}
