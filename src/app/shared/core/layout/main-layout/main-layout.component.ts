import { Component, HostListener, OnInit } from '@angular/core';
import { lang } from 'moment';
import { IUser } from '../../../model/user.model';
import { LANGUAGE_VI, LANGUAGE_EN } from '../../../constant/base.constant';
import { SidebarConstant } from '../../../../sidebar.constant';

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
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth <= 1366) {
      this.isCollapsed = true;
    }
  }

  ngOnInit(): void {
  //   const profile = this.authService.getCurrentUser();
  //   const token = this.authService.getToken();
  //   if (!profile) {
  //     if (token) {
  //       this.authService.myProfile().subscribe(response => {
  //         this.currentUser = response?.body?.data as IUser;
  //         this.localStorage.store(LOCAL_STORAGE.PROFILE, this.currentUser);
  //         this.authService.myAuthorities(this.currentUser?.id).subscribe(res => {
  //           if (this.currentUser) {
  //             this.currentUser.userPrimary = res.body?.data as UserPrimary;
  //           }
  //           this.localStorage.store(LOCAL_STORAGE.PROFILE, this.currentUser);
  //         });
  //       });
  //     } else {
  //       this.router.navigate([`home`]);
  //     }
  //   } else {
  //     this.currentUser = profile;
  //   }
  }

  getShortName(fullName?: string) {
    // if (!fullName) {
    //   return 'User Name';
    // }
    // const list = fullName.split(' ');
    // if (list.length > 5) {
    //   return list[0] + ' ' + list[list.length - 1];
    // } else {
    //   return fullName;
    // }
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
      // this.localStorage.store(LOCAL_STORAGE.LANGUAGE, language);
      this.currentLanguage = language;
      // location.reload();
    } else {
      this.visible = false;
    }
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

  openChangePasswordModal() {
    // if (this.authService.getTokenPrivateKey()) {
    //   const base = CommonUtil.modalBase(
    //     ChangePasswordComponent,
    //     { user: { id: this.authService.getTokenPrivateKey() } },
    //     '30%'
    //   );
    //   this.modalService.create(base);
    // }
  }

}
