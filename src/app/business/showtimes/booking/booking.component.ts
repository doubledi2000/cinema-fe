import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { AuthService } from '../../../shared/auth/auth.service';
import { IDrink } from '../../../shared/model/drinks.model';
import { IShowtime, Showtime } from '../../../shared/model/showtime.model';
import { DrinkService } from '../../../shared/service/drink.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {


  webSocketEndPoint: string = 'http://localhost:8070/ws';
  topic: string = "/topic/greetings/";
  stompClient: any;
  currentUserId = '';
  buyTicket?:boolean = false;
  buyDrink?:boolean = false;
  payment?: boolean = true;
  drinks: IDrink[] = [];
  @Input() detail?: IShowtime = new Showtime();
  @Input() userId?: string;
  constructor(
    private toastrService: ToastrService,
    private authServie: AuthService,
    private drinkService: DrinkService
    ) { }

  ngOnInit(): void {
    this._connect(this.detail.id);
    this.loadDrink();
    // this.authServie.myAuthorities().subscribe(resposne => {
    //   this.currentUserId = resposne.data.userId;
    // })
  }

  public loadDrink(){
    this.drinkService.search({locationId: this.detail?.locationId}).subscribe(res => {
      if(res && res.success) {
        this.drinks = res?.data as IDrink[];
      }
    })
  }

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
  let body;
  if(message.status == 'AVAILABLE') {
    body = {
      showtimeId: this.detail.id,
      ticketId: message.id,
      userId: this.userId,
      type: 'SELECT'
    }
  } else if(message.status = 'SELECTED') {
    body = {
      showtimeId: this.detail.id,
      ticketId: message.id,
      userId: this.userId,
      type: 'UNSELECT'
    }
  }

  if(body) {
    this.stompClient.send("/app/hello/" + this.detail.id, {}, JSON.stringify(body));
  }
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

  change(item: any): void{
    if (item.status == 'AVAILABLE'){
      item.status = 'YOUR_SELECT';
    }else if(item.status == 'YOUR_SELECT'){
      item.status = 'AVAILABLE';
    }
  }

  switchToBuyDrink(){
    this.buyDrink = true;
    this.buyTicket = false;
    this.payment = false;
  }

  switchToBooking(){
    this.buyDrink = false;
    this.buyTicket = true;
    this.payment = false;
  }

  handlerPayment(){
    if(!!this.payment) {

    }else{
      this.buyDrink = false;
      this.buyTicket = false;
      this.payment = true;
    }
  }
}
