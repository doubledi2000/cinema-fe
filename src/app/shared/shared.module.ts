import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ChairDirectiveDirective } from './chair-directive.directive';
import { ButtonActionComponent } from './component/button-action/button-action.component';
import { ButtonComponent } from './component/button/button.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { TableTitleComponent } from './component/table-title/table-title.component';
import { UploadImageComponent } from './component/upload-image/upload-image.component';
import { UploadSimpleComponent } from './component/upload-simple/upload-simple.component';
import { UploadComponent } from './component/upload/upload.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { HasRolesDirective } from './directive/has-roles.directive';
import { LimitWordPipe } from './pipe/limit-word.pipe';

@NgModule({
  declarations: [
    ChairDirectiveDirective,
    ButtonActionComponent,
    ButtonComponent,
    PaginationComponent,
    TableTitleComponent,
    UploadImageComponent,
    UploadComponent,
    LimitWordPipe,
    MainLayoutComponent,
    AuthLayoutComponent,
    HasRolesDirective,
    UploadSimpleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzToolTipModule,
    NzCalendarModule,
    NzDatePickerModule,
    NzTabsModule,
    NzIconModule,
    NzInputModule,
    NzStepsModule,
    NzCollapseModule,
    NzBreadCrumbModule,
    NzTreeViewModule,
    NzSwitchModule,
    NzModalModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzUploadModule,
    NzMessageModule,
    NzSelectModule,
    NzPopoverModule,
    NzListModule,
    NzDropDownModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterModule,
    NzCheckboxModule,
    ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzToolTipModule,
    NzCalendarModule,
    NzDatePickerModule,
    NzTabsModule,
    NzIconModule,
    NzInputModule,
    NzStepsModule,
    NzCollapseModule,
    NzBreadCrumbModule,
    NzTreeViewModule,
    NzSwitchModule,
    NzModalModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzUploadModule,
    NzMessageModule,
    NzSelectModule,
    NzPopoverModule,
    NzListModule,
    ButtonActionComponent,
    ButtonComponent,
    PaginationComponent,
    TableTitleComponent,
    UploadImageComponent,
    UploadComponent,
    LimitWordPipe,
    MainLayoutComponent,
    AuthLayoutComponent,
    NzCheckboxModule,
    HasRolesDirective,
    UploadSimpleComponent
  ],
  providers: [DatePipe]
})
export class SharedModule { }
