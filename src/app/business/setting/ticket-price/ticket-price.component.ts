import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-price',
  templateUrl: './ticket-price.component.html',
  styleUrls: ['./ticket-price.component.scss']
})
export class TicketPriceComponent implements OnInit {
  panels = [
    {
      active: true,
      name: 'Thứ 2',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 3'
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 4'
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 5'
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 6'
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 7'
    },
    {
      active: false,
      disabled: false,
      name: 'Chủ nhật'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
