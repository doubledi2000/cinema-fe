import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.scss']
})
export class RevenueReportComponent implements OnInit {
  searchForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  search(){

  }

  getIndex(i: number){

  }

}
