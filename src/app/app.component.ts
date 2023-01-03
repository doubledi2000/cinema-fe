import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/service/loader/loader.service';
import { SidebarConstant } from './sidebar.constant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  sidebar= SidebarConstant;
  constructor(
    public loaderService: LoaderService,
    private translateService: TranslateService){
  }
  ngOnInit(): void {
    this.translateService.setDefaultLang('vi');
    this.translateService.use('vi');
  }
}
