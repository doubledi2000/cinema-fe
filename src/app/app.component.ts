import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/service/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  constructor(public loaderService: LoaderService){
  }
  ngOnInit(): void {
  }
}
