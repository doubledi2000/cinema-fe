import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import CommonUtil from '../../../../shared/utils/common-util';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-price-modal',
  templateUrl: './add-price-modal.component.html',
  styleUrls: ['./add-price-modal.component.scss']
})
export class AddPriceModalComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private modalRef: NzModalRef
    ) { }

  ngOnInit(): void {
    this.initAddForm();

  }
  initAddForm(){
    this.form = this.fb.group({
      startTime: new Date(),
      endTime: new Date(),
      prices: this.fb.group({
        normalSeat: 0,
        vipSeat: 0,
        sweetSeat: 0
      })
    })
  }

  handleOk(){
    this.form.enable();
    const body = CommonUtil.trim({
      ...this.form.value
    })
    this.modalRef.close({
      success: true,
      value: body
    })
  }
}
