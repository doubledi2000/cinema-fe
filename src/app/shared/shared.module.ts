import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChairDirectiveDirective } from './chair-directive.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';





@NgModule({
  declarations: [
    ChairDirectiveDirective,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzToolTipModule,
    NzCalendarModule
  ],
  exports: [
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzToolTipModule,
    NzCalendarModule
  ]
})
export class SharedModule { }
