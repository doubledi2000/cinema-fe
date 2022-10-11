import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

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
  change(item: any): void{
    if (item.status == 'AVAILABLE'){
      item.status = 'YOUR_SELECT';
    }else if(item.status == 'YOUR_SELECT'){
      item.status = 'AVAILABLE';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
