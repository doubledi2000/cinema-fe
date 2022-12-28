import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const authorities = route.data.authorities || [];
    return this.checkRole(authorities, state.url)
  }

  checkRole(authorities: string[], url: string) {
    if(!authorities || authorities.length == 0) {
      return true;
    }

    if(this.authService.getCurrentUser()) {
      const hasAnyAuthority = this.authService.hasAnyAuthority(authorities);
      return hasAnyAuthority;
    }

    return false;
  }
  
}
