import { RESOURCE } from './../constant/resource.constant';
import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPrimary } from '../model/user-primary.model';
import { LOCAL_STORAGE } from '../constant/local.constant';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_UTILS } from '../utils/router.utils';
import { BOOLEAN_STRING } from '../constant/common.constant';
import jwt_decode from 'jwt-decode';
import { IBaseResponse } from '../model/base.model';


type EntityResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: UserPrimary;
  private tokenPrivateKey?: string;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private toast: ToastrService
  ) { }


  login(request: any): Observable<any> {
    this.clear();
    console.log(this)
    debugger;
    return this.httpClient.post(`${RESOURCE.URL}/authenticate`, request)
    .pipe(map(this.authenticateSuccess.bind(this, request.rememberMe)));
  }

  myAuthorities(): Observable<IBaseResponse<UserPrimary>>{
    return this.httpClient.get<IBaseResponse<UserPrimary>>(`${RESOURCE.URL}/me/authorities`);
  }

  storeProfile(redirectUrl: string): void{
    debugger;
    this.myAuthorities().subscribe(response => {
      const authorities = response?.data as UserPrimary;
      this.localStorage.store(LOCAL_STORAGE.PROFILE, JSON.stringify(authorities));
      if (redirectUrl) {
        this.router.navigate([`${redirectUrl}`]);
      }
    })
  }

  hasAnyAuthority(authorities: string | string[]) {
    this.currentUser = this.getCurrentUser();
    debugger;
    console.log()
    if(!this.currentUser) {
      return false;
    }

    if(this.currentUser?.isRoot) {
      return true;
    }

    if(!authorities || authorities?.length == 0) {
      return true;
    }
    let grantedPermissions = [];
    if(this.currentUser) {
      grantedPermissions = this.currentUser.grantedPermissions;
      if(grantedPermissions) {
        if(!Array.isArray(authorities)) {
          return grantedPermissions.includes(authorities);
        } else {
          for(const authority of authorities) {
            if(grantedPermissions.includes(authority)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  getCurrentUser(){
    if(!!this.currentUser) {
      return this.currentUser as UserPrimary;
    }
    debugger;

    const userLocal = this.localStorage.retrieve(LOCAL_STORAGE.PROFILE);
    if(userLocal) {
      return JSON.parse(userLocal) as UserPrimary;
    }
    return null;
  }

  authenticateSuccess(rememberMe: boolean, response: any){
    const accessToken = response?.data?.accessToken;
    const isSuccess = response?.success;
    if (!isSuccess) {
      this.toast.error('Bạn chưa đăng nhập');
      this.router.navigate([ROUTER_UTILS.authentication.root]);
    } else {
      if(rememberMe) {
        this.localStorage.store(LOCAL_STORAGE.REMEMBER_ME, BOOLEAN_STRING.TRUE);
      }
    }
    this.storeAuthenticationToken(accessToken, rememberMe);

  }

  clear(): void {
    this.localStorage.clear(LOCAL_STORAGE.PROFILE);
    this.localStorage.clear(LOCAL_STORAGE.JWT_TOKEN);
    this.localStorage.clear(LOCAL_STORAGE.REMEMBER_ME);
    this.localStorage.clear(LOCAL_STORAGE.REFRESH_TOKEN);

    this.sessionStorage.clear(LOCAL_STORAGE.JWT_TOKEN);
    this.currentUser = null;
  }

  storeAuthenticationToken(jwt: string, rememberMe: boolean) {
    const decoder: any = jwt_decode(jwt);
    this.tokenPrivateKey = decoder?.user_id as string;
    if(this.tokenPrivateKey) {
      this.localStorage.store(LOCAL_STORAGE.JWT_TOKEN, jwt)
    }

    if (rememberMe) {
      this.localStorage.store(LOCAL_STORAGE.JWT_TOKEN, jwt);
    } else {
      this.sessionStorage.store(LOCAL_STORAGE.JWT_TOKEN, jwt);
    }
  }

}
