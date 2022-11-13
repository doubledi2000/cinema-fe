import { Component, Input, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { IShowtime, Showtime } from '../../../shared/model/showtime.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  webSocketEndPoint: string = 'http://localhost:8070/ws';
  topic: string = "/topic/greetings/";
  stompClient: any;

_connect(id?: string) {
  console.log("Initialize WebSocket Connection");
  let ws = new SockJS(this.webSocketEndPoint);
  this.stompClient = Stomp.over(ws);
  const _this = this;
  _this.stompClient.connect({}, function (frame:any) {
      _this.stompClient.subscribe(_this.topic + `${id}`, function (sdkEvent: any) {
          _this.handle(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
  }, this.errorCallBack);
};

_disconnect() {
  if (this.stompClient !== null) {
      this.stompClient.disconnect();
  }
  console.log("Disconnected");
}

// on error, schedule a reconnection attempt
errorCallBack(error: any) {
  console.log("errorCallBack -> " + error)
  setTimeout(() => {
      this._connect();
  }, 5000);
}

/**
* Send message to sever via web socket
* @param {*} message
*/
_send(message: any) {
  console.log("calling logout api via web socket");
  const body = {
    showtimeId: this.detail.id,
    ticketId: message.id,
    userId: 'AAAA',
    type: 'SELECT'
  }
  this.stompClient.send("/app/hello/" + this.detail.id, {}, JSON.stringify(body));
}

handle(data: any) {
  let response = JSON.parse(data.body)
  if(response && response.data.success) {
    this.changeStatus(response.data.ticketId, response.data.status);
  }else {
    this.toastrService.error(response.data.message);
  }
}

changeStatus(ticketId?: string, status?: string){
  this.detail.rows.forEach(ele =>{
    ele.tickets.forEach(tick =>{
      if(tick.id == ticketId) {
        tick.status = status;
      }
    })
  })
}


  @Input() detail?: IShowtime = new Showtime();
  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    console.log(this.detail)
    this._connect(this.detail.id);
  }

  change(item: any): void{
    if (item.status == 'AVAILABLE'){
      item.status = 'YOUR_SELECT';
    }else if(item.status == 'YOUR_SELECT'){
      item.status = 'AVAILABLE';
    }
  }
}
