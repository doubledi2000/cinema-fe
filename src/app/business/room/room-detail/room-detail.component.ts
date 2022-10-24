import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  scale = 1200/(45 * 10 +100);
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }
  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  changeS(value: boolean): void {
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  demoValue = 3;
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
    }
  
  
  ]
  getIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  change(item: any, index: number): void{
    
    for(let i = 0; i < 10;i++){
      if(i === index) {
        this.getIndex = i;
        if (item.status == 'AVAILABLE'){
          item.status = 'YOUR_SELECT';
        }else if(item.status == 'YOUR_SELECT'){
          item.status = 'AVAILABLE';
        }
      }
    }
    
  }
}
