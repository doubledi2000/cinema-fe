import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChairDirectiveDirective } from './chair-directive.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
  declarations: [
    ChairDirectiveDirective
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzTableModule
  ],
  exports: [
    CommonModule,
    NzButtonModule,
    NzTableModule
  ]
})
export class SharedModule { }
