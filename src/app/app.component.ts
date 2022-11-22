import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/service/loader/loader.service';
import { SidebarConstant } from './sidebar.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  sidebar= SidebarConstant;
  constructor(public loaderService: LoaderService){
  }
  ngOnInit(): void {
    console.log(this.isCollapsed)
  }
}
