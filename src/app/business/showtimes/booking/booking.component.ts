import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { AuthService } from '../../../shared/auth/auth.service';
import { IDrink } from '../../../shared/model/drinks.model';
import { IShowtime, Showtime } from '../../../shared/model/showtime.model';
import { DrinkService } from '../../../shared/service/drink.service';
import { Location } from '../../../shared/model/location.model';
import { LocationService } from '../../../shared/service/location.service';
import { ShowtimeService } from '../../../shared/service/showtime.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {


  webSocketEndPoint: string = 'http://localhost:8070/ws';
  topic: string = "/topic/greetings/";
  stompClient: any;
  currentUserId = '';
  buyTicket?:boolean = true;
  buyDrink?:boolean = false;
  payment?: boolean = false;
  drinks: IDrink[] = [];
  @Input() detail?: IShowtime = new Showtime();
  @Input() userId?: string;
  location: Location = new Location();
  bookingRequest: any;
  itemValue: number[] = [];
  seatPicked = [];
  seatNames = [];
  tickePrice = 0;
  haveTicket = false;
  drinkPicked = [];
  totalPayment = 0;
  constructor(
    private toastrService: ToastrService,
    private authServie: AuthService,
    private drinkService: DrinkService,
    private locationService: LocationService,
    private showtimeService: ShowtimeService,
    private modalRef: NzModalRef,
    ) { }
  ngOnDestroy(): void {
    this._disconnect();
  }

  ngOnInit(): void {
    this._connect(this.detail.id);
    this.loadDrink();
    this.loadLocation();
    this.initBookingRequest();
    // this.authServie.myAuthorities().subscribe(resposne => {
    //   this.currentUserId = resposne.data.userId;
    // })
  }

  initBookingRequest(){
    this.bookingRequest = {
      locationId: this.detail.locationId,
      showtimeId: this.detail.id,
      items: []
    }
  }

  handleItem(id: string, event: number) {
    let isExisted = false;
    this.bookingRequest.items.forEach((element, index) => {
      if(element.itemId == id) {
        if(event == 0) {
          this.bookingRequest.items.splice(index, 1);
        } else {
        this.bookingRequest.items[index].quantity = event;
        }
        isExisted = true;
      }
    });
    if(!isExisted) {
      this.bookingRequest.items.push({itemId:id, quantity: event})
    }
  }

  loadLocation(){
    this.locationService.getById(this.detail.locationId).subscribe(res => {
      if(res && res.success) {
        this.location = res.data as Location;
      }
    })
  }

  public loadDrink(){
    this.drinkService.search({locationId: this.detail?.locationId}).subscribe(res => {
      if(res && res.success) {
        this.drinks = res?.data as IDrink[];
        this.itemValue = Array(this.drinks.length).fill(0);
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
  this.showtimeService.cancel(this.detail.id).subscribe(res => {
  });
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
  debugger;
  if(message.status == 'AVAILABLE') {
    body = {
      showtimeId: this.detail.id,
      ticketId: message.id,
      userId: this.userId,
      type: 'SELECT'
    }
    this.stompClient.send("/app/hello/" + this.detail.id, {}, JSON.stringify(body));
    this.seatPicked.push(message);
    this.seatNames.push(message.name);
    this.haveTicket = true;
    this.tickePrice = this.tickePrice + message.price;
  } else if(message.status == 'SELECTED') {
    body = {
      showtimeId: this.detail.id,
      ticketId: message.id,
      userId: this.userId,
      type: 'UNSELECT'
    }
    this.stompClient.send("/app/hello/" + this.detail.id, {}, JSON.stringify(body));
    this.seatPicked.forEach((element, index) => {
      if(element.id == message.id) {
        this.tickePrice = this.tickePrice + message.price;
        this.seatNames.splice(index, 1);
        this.seatPicked.splice(index, 1);
      }
    })
    if(this.seatPicked.length == 0) {
      this.haveTicket = false;
    }
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

    debugger;
      this.showtimeService.booking(this.bookingRequest).subscribe(res => {
        if(res && res.success) {
          this.toastrService.success('Đặt vé thành công');
          this.modalRef.close({
            success: true,
          })
        }
      })
    }else{
      this.drinkPicked = [];
      this.totalPayment = 0;
      this.bookingRequest.items.forEach(element => {
        let drink = this.drinks.find(e => e.id == element.itemId);
        this.drinkPicked.push({name:drink.name, quantity: element.quantity, price: drink.price * element.quantity});
        this.totalPayment = this.totalPayment + drink.price * element.quantity;
      });
      this.totalPayment = this.totalPayment + this.tickePrice;
      this.buyDrink = false;
      this.buyTicket = false;
      this.payment = true;
    }
  }
}
