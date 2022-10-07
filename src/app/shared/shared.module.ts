import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChairDirectiveDirective } from './chair-directive.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ChairDirectiveDirective,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzToolTipModule,
    NzCalendarModule,
    NzDatePickerModule,
    NzTabsModule
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
    NzTabsModule
  ]
})
export class SharedModule { }
