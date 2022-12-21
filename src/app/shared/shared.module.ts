import { NgModule } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { ChairDirectiveDirective } from './chair-directive.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzListModule } from 'ng-zorro-antd/list';
import { ToastrModule } from 'ngx-toastr';
import { ButtonActionComponent } from './component/button-action/button-action.component';
import { ButtonComponent } from './component/button/button.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TableTitleComponent } from './component/table-title/table-title.component';
import { UploadImageComponent } from './component/upload-image/upload-image.component';
import { LimitWordPipe } from './pipe/limit-word.pipe';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DashboardModule } from '../business/dashboard/dashboard.module';
import { UploadComponent } from './component/upload/upload.component';
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
    AuthLayoutComponent
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
    NzCheckboxModule
  ],
  providers: [DatePipe]
})
export class SharedModule { }
