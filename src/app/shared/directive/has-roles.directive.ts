import { Directive, ViewContainerRef,  TemplateRef, Input} from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[hasRoles]'
})
export class HasRolesDirective {

  private authorities: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) { }

  @Input() set hasRoles(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;

    this.updateView();
  }

  private updateView(){
    const hasAnyAuthority = this.authService.hasAnyAuthority(this.authorities);
    this.viewContainerRef.clear();
    if(hasAnyAuthority) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
