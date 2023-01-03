import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ChangePasswordComponent } from '../../../../business/setting/change-password/change-password.component';
import { SidebarConstant } from '../../../../sidebar.constant';
import { AuthService } from '../../../auth/auth.service';
import { LANGUAGE_EN, LANGUAGE_VI } from '../../../constant/base.constant';
import { LOCAL_STORAGE } from '../../../constant/local.constant';
import { IUser } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
import CommonUtil from '../../../utils/common-util';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  visible = false;
  isCollapsed = true;
  currentUser?: IUser;
  title = '';
  VI = LANGUAGE_VI;
  EN = LANGUAGE_EN;
  currentLanguage = this.VI;
  isDashboard = false;
  sidebar = SidebarConstant;
  constructor(
    private modalRef: NzModalService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth <= 1366) {
      this.isCollapsed = true;
    }
  }

  myProfile() {
    this.userService.myProfile().subscribe( res => {
      if(res && res.success) {
        this.currentUser = res.data as IUser
    }})
  }

  ngOnInit(): void {
    this.myProfile();
  }

  getShortName(fullName?: string) {
    if (!fullName) {
      return 'User Name';
    }
    const list = fullName.split(' ');
    if (list.length > 5) {
      return list[0] + ' ' + list[list.length - 1];
    } else {
      return fullName;
    }
  }

  logout(): void {
    // this.authService.logout().subscribe(_response => {
    //   this.toast.success('model.logout.success.authenticate');
    // });
    // this.authService.clear();
    // this.router.navigate(['/home']);
  }

  onChangeLanguage(language: string): void {
    if (this.currentLanguage !== language) {
      this.localStorage.store(LOCAL_STORAGE.LANGUAGE, language);
      this.currentLanguage = language;
      location.reload();
    } else {
      this.visible = false;
    }
  }

  changePassword(){
    const base = CommonUtil.modalBase(
      ChangePasswordComponent,
      '30%'
    )
    this.modalRef.create(base);
  }

  navigateDashboard(): void {
    // this.router.navigate(['/dashboard']);
  }

  getImg(img: string){
    // return img + '?token=' + this.authService.getToken();
  }

  toChangeProfile() {
    // this.router.navigate([
    //   // ROUTER_UTILS.setting.root, ROUTER_UTILS.setting.myProfile
    // ]);
  }

}
